import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { ResponderAtividadeDto } from '../../dtos/atividade/responder-atividade.dto';
import { TentativaAtividade } from '../../models/tentativa-atividade/tentativa-atividade.entity';
import { PerguntaAtividade } from '../../models/pergunta-atividade/pergunta-atividade.entity';
import { Atividade } from '../../models/atividade/atividade.entity';
import { Usuario } from '../../models/usuario/usuario.entity';
import { DadosSessaoSocial, SessaoService } from '../sessao/sessao-social.service';

@Injectable()
export class AtividadeService {
  constructor(
    @InjectRepository(Atividade)
    private readonly activityRepository: Repository<Atividade>,
    @InjectRepository(PerguntaAtividade)
    private readonly questionRepository: Repository<PerguntaAtividade>,
    @InjectRepository(TentativaAtividade)
    private readonly attemptRepository: Repository<TentativaAtividade>,
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    private readonly sessionService: SessaoService,
  ) {}

  async listarAtividades(organizacaoUuid: string) {
    return this.activityRepository.find({
      where: { organizacaoUuid, ativo: true },
      order: { criadoEm: 'DESC' },
    });
  }

  async iniciarAtividade(session: DadosSessaoSocial, atividadeUuid: string) {
    const activity = await this.activityRepository.findOne({
      where: { uuid: atividadeUuid, organizacaoUuid: session.organizacaoUuid, ativo: true },
    });

    if (!activity) {
      throw new NotFoundException('Atividade não encontrada');
    }

    const firstQuestion = await this.questionRepository.findOne({
      where: { atividadeUuid },
      order: { ordem: 'ASC' },
    });

    if (!firstQuestion) {
      throw new NotFoundException('Atividade sem perguntas cadastradas');
    }

    const attempt = await this.attemptRepository.save(
      this.attemptRepository.create({
        uuid: randomUUID(),
        atividadeUuid,
        usuarioUuid: session.usuario.uuid,
        indicePergunta: firstQuestion.ordem,
        perguntaIniciadaEm: new Date(),
      }),
    );

    return {
      tentativaUuid: attempt.uuid,
      question: {
        ordem: firstQuestion.ordem,
        pergunta: firstQuestion.pergunta,
      },
      tempoLimiteSegundos: 60,
    };
  }

  async responderPergunta(session: DadosSessaoSocial, dto: ResponderAtividadeDto) {
    const attempt = await this.attemptRepository.findOne({
      where: {
        uuid: dto.tentativaUuid,
        usuarioUuid: session.usuario.uuid,
      },
    });

    if (!attempt || attempt.concluido) {
      throw new NotFoundException('Tentativa não encontrada ou já finalizada');
    }

    const activity = await this.activityRepository.findOne({ where: { uuid: attempt.atividadeUuid } });
    if (!activity) {
      throw new NotFoundException('Atividade não encontrada');
    }

    const currentQuestion = await this.questionRepository.findOne({
      where: {
        atividadeUuid: attempt.atividadeUuid,
        ordem: attempt.indicePergunta,
      },
    });

    if (!currentQuestion) {
      throw new NotFoundException('Pergunta atual não encontrada');
    }

    const startedAt = attempt.perguntaIniciadaEm?.getTime() || 0;
    const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
    if (elapsedSeconds > 60) {
      throw new ForbiddenException('Tempo excedido para esta pergunta');
    }

    const normalizedAnswer = dto.resposta.trim().toLowerCase();
    const normalizedCorrect = currentQuestion.respostaCorreta.trim().toLowerCase();
    const acertou = normalizedAnswer === normalizedCorrect;

    if (acertou) {
      attempt.acertos += 1;
      attempt.moedasGanhas += activity.moedasPorAcerto;
    }

    const proximaPergunta = await this.questionRepository.findOne({
      where: { atividadeUuid: attempt.atividadeUuid, ordem: attempt.indicePergunta + 1 },
    });

    if (!proximaPergunta) {
      attempt.concluido = true;
      attempt.perguntaIniciadaEm = null;

      const user = await this.userRepository.findOne({ where: { uuid: session.usuario.uuid } });
      if (!user) {
        throw new NotFoundException('Usuario não encontrado');
      }

      user.moedas += attempt.moedasGanhas;
      await this.userRepository.save(user);
      this.sessionService.atualizarMoedas(session.sessaoId, user.moedas);
      await this.attemptRepository.save(attempt);

      return {
        finalizado: true,
        acertou,
        moedasGanhas: attempt.moedasGanhas,
        acertos: attempt.acertos,
        moedasTotais: user.moedas,
      };
    }

    attempt.indicePergunta = proximaPergunta.ordem;
    attempt.perguntaIniciadaEm = new Date();
    await this.attemptRepository.save(attempt);

    return {
      finalizado: false,
      acertou,
      proximaPergunta: {
        ordem: proximaPergunta.ordem,
        pergunta: proximaPergunta.pergunta,
      },
      tempoLimiteSegundos: 60,
    };
  }
}
