import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { PerfilInstagram } from '../../../social/models/perfil-instagram/perfil-instagram.entity';
import { PublicacaoAdminService } from '../publicacao/publicacao.service';

const CONTEUDO_VALUES = ['EXTERNO', 'INTERNO', 'ANUNCIANTE'] as const;
const ESCOPO_VALUES = ['PRIVADO', 'PUBLICO'] as const;

@Injectable()
export class PerfilInstagramService {
  constructor(
    @InjectRepository(PerfilInstagram)
    private readonly perfilInstagramRepository: Repository<PerfilInstagram>,
    private readonly publicacaoAdminService: PublicacaoAdminService,
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
    const perfil = await this.perfilInstagramRepository.findOne({
      where: { uuid, organizacaoId },
    });

    if (!perfil) {
      throw new NotFoundException('Perfil de Instagram não encontrado');
    }

    return perfil;
  }

  async findAll(organizacaoId: number) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    return this.perfilInstagramRepository.find({
      where: { organizacaoId: normalizedOrgId },
      order: { id: 'DESC' },
    });
  }

  async get(organizacaoId: number, uuid: string) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    return this.resolveByUuid(normalizedOrgId, uuid);
  }

  async create(organizacaoId: number, payload: Partial<PerfilInstagram>) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);

    const perfilValue = this.normalizePerfil(payload.perfil || '');
    if (!perfilValue) {
      throw new BadRequestException('Informe o perfil do Instagram.');
    }

    const exists = await this.perfilInstagramRepository.findOne({
      where: { organizacaoId: normalizedOrgId, perfil: perfilValue },
    });
    if (exists) {
      throw new BadRequestException('Este perfil já está cadastrado para a organização.');
    }

    const perfil = this.perfilInstagramRepository.create({
      uuid: randomUUID(),
      organizacaoId: normalizedOrgId,
      perfil: perfilValue,
      categoria: payload.categoria || null,
      conteudo: this.parseConteudo(payload.conteudo),
      escopo: this.parseEscopo(payload.escopo),
      destaque: this.parseBoolean(payload.destaque, false),
      ativo: this.parseBoolean(payload.ativo, true),
    });

    return this.perfilInstagramRepository.save(perfil);
  }

  async update(organizacaoId: number, uuid: string, payload: Partial<PerfilInstagram>) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    const perfil = await this.resolveByUuid(normalizedOrgId, uuid);

    if (payload.perfil !== undefined) {
      const perfilValue = this.normalizePerfil(String(payload.perfil));
      if (!perfilValue) {
        throw new BadRequestException('Informe o perfil do Instagram.');
      }

      const duplicate = await this.perfilInstagramRepository.findOne({
        where: { organizacaoId: perfil.organizacaoId, perfil: perfilValue },
      });
      if (duplicate && duplicate.uuid !== perfil.uuid) {
        throw new BadRequestException('Este perfil já está cadastrado para a organização.');
      }

      perfil.perfil = perfilValue;
    }

    if (payload.categoria !== undefined) {
      perfil.categoria = payload.categoria || null;
    }

    if (payload.ativo !== undefined) {
      perfil.ativo = this.parseBoolean(payload.ativo, perfil.ativo);
    }

    if (payload.conteudo !== undefined) {
      perfil.conteudo = this.parseConteudo(payload.conteudo);
    }

    if (payload.escopo !== undefined) {
      perfil.escopo = this.parseEscopo(payload.escopo);
    }

    if (payload.destaque !== undefined) {
      perfil.destaque = this.parseBoolean(payload.destaque, perfil.destaque);
    }

    return this.perfilInstagramRepository.save(perfil);
  }

  async remove(organizacaoId: number, uuid: string) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    const perfil = await this.resolveByUuid(normalizedOrgId, uuid);
    await this.perfilInstagramRepository.remove(perfil);
  }

  async syncInstagram(organizacaoId: number, uuid: string) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    const perfil = await this.resolveByUuid(normalizedOrgId, uuid);
    // Pass ID (not UUID) for internal logic
    return this.publicacaoAdminService.syncInstagramById(normalizedOrgId, perfil.id);
  }

  private parseBoolean(value: unknown, defaultValue: boolean) {
    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true') {
        return true;
      }
      if (normalized === 'false') {
        return false;
      }
    }

    return defaultValue;
  }

  private normalizePerfil(value: string) {
    return value.replace(/^@+/, '').trim().toLowerCase();
  }

  private parseConteudo(value: unknown) {
    const normalized = String(value ?? 'EXTERNO').trim().toUpperCase();
    if (!CONTEUDO_VALUES.includes(normalized as (typeof CONTEUDO_VALUES)[number])) {
      throw new BadRequestException(`Conteúdo inválido. Valores aceitos: ${CONTEUDO_VALUES.join(', ')}`);
    }
    return normalized;
  }

  private parseEscopo(value: unknown) {
    const normalized = String(value ?? 'PRIVADO').trim().toUpperCase();
    if (!ESCOPO_VALUES.includes(normalized as (typeof ESCOPO_VALUES)[number])) {
      throw new BadRequestException(`Escopo inválido. Valores aceitos: ${ESCOPO_VALUES.join(', ')}`);
    }
    return normalized;
  }
}
