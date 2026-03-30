import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { Publicacao } from '../../models/publicacao/publicacao.entity';

interface RegistrarAtividadeInput {
  organizacaoId: number;
  usuarioId: number;
  texto: string;
  urlRedirecionamento?: string | null;
  tituloRedirecionamento?: string | null;
}

@Injectable()
export class AtividadeSocialService {
  constructor(
    @InjectRepository(Publicacao)
    private readonly postRepository: Repository<Publicacao>,
  ) {}

  async registrarAtividade(input: RegistrarAtividadeInput) {
    const payload = this.postRepository.create({
      uuid: randomUUID(),
      organizacaoId: input.organizacaoId,
      usuarioId: input.usuarioId,
      tipo: 'atividade',
      texto: input.texto,
      midiaUrl: null,
      urlRedirecionamento: input.urlRedirecionamento ?? null,
      tituloRedirecionamento: input.tituloRedirecionamento ?? null,
      conteudo: 'INTERNO',
      escopo: 'PUBLICO',
      destaque: false,
    });

    return this.postRepository.save(payload);
  }
}
