import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { Jogo } from '../../../social/models/jogo/jogo.entity';

@Injectable()
export class JogoService {
  constructor(
    @InjectRepository(Jogo)
    private readonly jogoRepository: Repository<Jogo>,
  ) {}

  private normalizeOrganizationId(organizacaoId: number | null | undefined) {
    const normalized = Number(organizacaoId || 0);
    if (!Number.isInteger(normalized) || normalized <= 0) {
      throw new BadRequestException('Organização inválida na sessão do usuário.');
    }

    return normalized;
  }

  /**
   * Resolve UUID to database entity (with ID).
   * Pattern: Controller sends UUID → Service resolves to entity with ID → Logic uses ID
   */
  private async resolveByUuid(organizacaoId: number, uuid: string) {
    const jogo = await this.jogoRepository.findOne({
      where: { uuid, organizacaoId },
    });

    if (!jogo) {
      throw new NotFoundException('Jogo não encontrado');
    }

    return jogo;
  }

  async findAll(organizacaoId: number) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    return this.jogoRepository.find({ where: { organizacaoId: normalizedOrgId }, order: { id: 'DESC' } });
  }

  async get(uuid: string, organizacaoId: number) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    return this.resolveByUuid(normalizedOrgId, uuid);
  }

  async create(organizacaoId: number, payload: Partial<Jogo>) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);

    const jogo = this.jogoRepository.create({
      uuid: randomUUID(),
      organizacaoId: normalizedOrgId,
      nome: payload.nome,
      descricao: payload.descricao || null,
      url: payload.url,
      custoMoedas: Number(payload.custoMoedas || 0),
      ativo: true,
    });
    return this.jogoRepository.save(jogo);
  }

  async update(uuid: string, payload: Partial<Jogo>, organizacaoId: number) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    const jogo = await this.resolveByUuid(normalizedOrgId, uuid);
    jogo.nome = payload.nome ?? jogo.nome;
    jogo.descricao = payload.descricao ?? jogo.descricao;
    jogo.url = payload.url ?? jogo.url;
    jogo.custoMoedas = payload.custoMoedas !== undefined ? Number(payload.custoMoedas) : jogo.custoMoedas;
    return this.jogoRepository.save(jogo);
  }

  async remove(uuid: string, organizacaoId: number) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    const jogo = await this.resolveByUuid(normalizedOrgId, uuid);
    await this.jogoRepository.remove(jogo);
  }
}
