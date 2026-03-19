import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { Jogo } from '../../../social/models/jogo/jogo.entity';
import { Organizacao } from '../../../social/models/organizacao/organizacao.entity';

@Injectable()
export class JogoService {
  constructor(
    @InjectRepository(Jogo)
    private readonly jogoRepository: Repository<Jogo>,
    @InjectRepository(Organizacao)
    private readonly organizacaoRepository: Repository<Organizacao>,
  ) {}

  async listOrganizations() {
    return this.organizacaoRepository.find({ where: { ativo: true }, order: { nome: 'ASC' } });
  }

  async findAll() {
    return this.jogoRepository.find({ order: { id: 'DESC' } });
  }

  async get(uuid: string) {
    const jogo = await this.jogoRepository.findOne({ where: { uuid } });
    if (!jogo) {
      throw new NotFoundException('Jogo não encontrado');
    }

    return jogo;
  }

  async create(payload: Partial<Jogo>) {
    const jogo = this.jogoRepository.create({
      uuid: randomUUID(),
      organizacaoUuid: payload.organizacaoUuid,
      nome: payload.nome,
      descricao: payload.descricao || null,
      url: payload.url,
      custoMoedas: Number(payload.custoMoedas || 0),
      ativo: payload.ativo !== false,
    });
    return this.jogoRepository.save(jogo);
  }

  async update(uuid: string, payload: Partial<Jogo>) {
    const jogo = await this.get(uuid);
    jogo.organizacaoUuid = payload.organizacaoUuid ?? jogo.organizacaoUuid;
    jogo.nome = payload.nome ?? jogo.nome;
    jogo.descricao = payload.descricao ?? jogo.descricao;
    jogo.url = payload.url ?? jogo.url;
    jogo.custoMoedas = payload.custoMoedas !== undefined ? Number(payload.custoMoedas) : jogo.custoMoedas;
    jogo.ativo = typeof payload.ativo === 'boolean' ? payload.ativo : jogo.ativo;
    return this.jogoRepository.save(jogo);
  }

  async remove(uuid: string) {
    const jogo = await this.get(uuid);
    await this.jogoRepository.remove(jogo);
  }
}
