import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { CriarConversaDto } from '../../dtos/conversa/criar-conversa.dto';
import { EnviarMensagemConversaDto } from '../../dtos/conversa/enviar-mensagem-conversa.dto';
import { MensagemConversa } from '../../models/mensagem-conversa/mensagem-conversa.entity';
import { ParticipanteConversa } from '../../models/participante-conversa/participante-conversa.entity';
import { Conversa } from '../../models/conversa/conversa.entity';
import { Usuario } from '../../models/usuario/usuario.entity';
import { DadosSessaoSocial } from '../sessao/sessao-social.service';

@Injectable()
export class ConversaService {
  constructor(
    @InjectRepository(Conversa)
    private readonly threadRepository: Repository<Conversa>,
    @InjectRepository(ParticipanteConversa)
    private readonly participantRepository: Repository<ParticipanteConversa>,
    @InjectRepository(MensagemConversa)
    private readonly messageRepository: Repository<MensagemConversa>,
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
  ) {}

  async listarConversas(session: DadosSessaoSocial) {
    return this.participantRepository
      .createQueryBuilder('participant')
      .innerJoinAndSelect('participant.thread', 'thread')
      .where('participant.usuario_uuid = :usuarioUuid', { usuarioUuid: session.usuario.uuid })
      .andWhere('thread.organizacao_uuid = :organizacaoUuid', { organizacaoUuid: session.organizacaoUuid })
      .orderBy('thread.criado_em', 'DESC')
      .getMany();
  }

  async criarConversa(session: DadosSessaoSocial, dto: CriarConversaDto) {
    const target = await this.userRepository.findOne({
      where: {
        uuid: dto.participanteUsuarioUuid,
        organizacaoUuid: session.organizacaoUuid,
        ativo: true,
      },
    });

    if (!target) {
      throw new NotFoundException('Participante não encontrado na organizacao');
    }

    const conversaUuid = randomUUID();
    const thread = await this.threadRepository.save(
      this.threadRepository.create({
        uuid: conversaUuid,
        organizacaoUuid: session.organizacaoUuid,
        criadoPorUsuarioUuid: session.usuario.uuid,
      }),
    );

    await this.participantRepository.save([
      this.participantRepository.create({
        conversaUuid,
        usuarioUuid: session.usuario.uuid,
      }),
      this.participantRepository.create({
        conversaUuid,
        usuarioUuid: target.uuid,
      }),
    ]);

    return thread;
  }

  async listarMensagens(session: DadosSessaoSocial, conversaUuid: string) {
    await this.ensureParticipant(session.usuario.uuid, conversaUuid);

    return this.messageRepository.find({
      where: { conversaUuid },
      order: { criadoEm: 'ASC' },
    });
  }

  async enviarMensagem(session: DadosSessaoSocial, conversaUuid: string, dto: EnviarMensagemConversaDto) {
    await this.ensureParticipant(session.usuario.uuid, conversaUuid);

    return this.messageRepository.save(
      this.messageRepository.create({
        conversaUuid,
        usuarioUuid: session.usuario.uuid,
        conteudo: dto.conteudo,
      }),
    );
  }

  private async ensureParticipant(usuarioUuid: string, conversaUuid: string) {
    const participant = await this.participantRepository.findOne({ where: { usuarioUuid, conversaUuid } });
    if (!participant) {
      throw new ForbiddenException('Você não participa desta conversa');
    }
  }
}
