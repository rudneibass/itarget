import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { Organizacao } from '../../../social/models/organizacao/organizacao.entity';
import { Recompensa } from '../../../social/models/recompensa/recompensa.entity';

@Injectable()
export class RecompensaService {
  constructor(
    @InjectRepository(Recompensa)
    private readonly recompensaRepository: Repository<Recompensa>,
    @InjectRepository(Organizacao)
    private readonly organizacaoRepository: Repository<Organizacao>,
  ) {}

  async listOrganizations() {
    return this.organizacaoRepository.find({ where: { ativo: true }, order: { nome: 'ASC' } });
  }

  async findAll() {
    return this.recompensaRepository.find({ order: { id: 'DESC' } });
  }

  async get(uuid: string) {
    const recompensa = await this.recompensaRepository.findOne({ where: { uuid } });
    if (!recompensa) {
      throw new NotFoundException('Recompensa não encontrada');
    }

    return recompensa;
  }

  async create(payload: Partial<Recompensa>) {
    const recompensa = this.recompensaRepository.create({
      uuid: randomUUID(),
      organizacaoUuid: payload.organizacaoUuid,
      titulo: payload.titulo,
      descricao: payload.descricao,
      tipo: payload.tipo,
      custoMoedas: Number(payload.custoMoedas || 0),
      ativo: payload.ativo !== false,
    });

    return this.recompensaRepository.save(recompensa);
  }

  async update(uuid: string, payload: Partial<Recompensa>) {
    const recompensa = await this.get(uuid);
    recompensa.organizacaoUuid = payload.organizacaoUuid ?? recompensa.organizacaoUuid;
    recompensa.titulo = payload.titulo ?? recompensa.titulo;
    recompensa.descricao = payload.descricao ?? recompensa.descricao;
    recompensa.tipo = payload.tipo ?? recompensa.tipo;
    recompensa.custoMoedas = payload.custoMoedas !== undefined ? Number(payload.custoMoedas) : recompensa.custoMoedas;
    recompensa.ativo = typeof payload.ativo === 'boolean' ? payload.ativo : recompensa.ativo;
    return this.recompensaRepository.save(recompensa);
  }

  async remove(uuid: string) {
    const recompensa = await this.get(uuid);
    await this.recompensaRepository.remove(recompensa);
  }
}
