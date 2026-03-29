import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { PerfilInstagram } from '../../../social/models/perfil-instagram/perfil-instagram.entity';
import { OrganizacaoService } from '../organizacao/organizacao.service';
import { PublicacaoAdminService } from '../publicacao/publicacao.service';

const CONTEUDO_VALUES = ['EXTERNO', 'INTERNO', 'ANUNCIANTE'] as const;
const ESCOPO_VALUES = ['PRIVADO', 'PUBLICO'] as const;

@Injectable()
export class PerfilInstagramService {
  constructor(
    @InjectRepository(PerfilInstagram)
    private readonly perfilInstagramRepository: Repository<PerfilInstagram>,
    private readonly organizacaoService: OrganizacaoService,
    private readonly publicacaoAdminService: PublicacaoAdminService,
  ) {}

  async findAll(ownerUuid: string) {
    const organizacaoId = await this.getOrganizationIdByOwner(ownerUuid);
    return this.perfilInstagramRepository.find({
      where: { organizacaoId },
      order: { id: 'DESC' },
    });
  }

  async get(ownerUuid: string, uuid: string) {
    const organizacaoId = await this.getOrganizationIdByOwner(ownerUuid);

    const perfil = await this.perfilInstagramRepository.findOne({
      where: { uuid, organizacaoId },
    });

    if (!perfil) {
      throw new NotFoundException('Perfil de Instagram não encontrado');
    }

    return perfil;
  }

  async create(ownerUuid: string, payload: Partial<PerfilInstagram>) {
    const organizacaoId = await this.getOrganizationIdByOwner(ownerUuid);

    const perfilValue = this.normalizePerfil(payload.perfil || '');
    if (!perfilValue) {
      throw new BadRequestException('Informe o perfil do Instagram.');
    }

    const exists = await this.perfilInstagramRepository.findOne({
      where: { organizacaoId, perfil: perfilValue },
    });
    if (exists) {
      throw new BadRequestException('Este perfil já está cadastrado para a organização.');
    }

    const perfil = this.perfilInstagramRepository.create({
      uuid: randomUUID(),
      organizacaoId,
      perfil: perfilValue,
      categoria: payload.categoria || null,
      conteudo: this.parseConteudo(payload.conteudo),
      escopo: this.parseEscopo(payload.escopo),
      destaque: this.parseBoolean(payload.destaque, false),
      ativo: this.parseBoolean(payload.ativo, true),
    });

    return this.perfilInstagramRepository.save(perfil);
  }

  async update(ownerUuid: string, uuid: string, payload: Partial<PerfilInstagram>) {
    const perfil = await this.get(ownerUuid, uuid);

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

  async remove(ownerUuid: string, uuid: string) {
    const perfil = await this.get(ownerUuid, uuid);
    await this.perfilInstagramRepository.remove(perfil);
  }

  async syncInstagram(ownerUuid: string, uuid: string) {
    return this.publicacaoAdminService.syncInstagramByUuid(ownerUuid, uuid);
  }

  private async getOrganizationIdByOwner(ownerUuid: string) {
    const organizacaoUuid = await this.organizacaoService.getOwnedOrganizationUuid(ownerUuid);
    if (!organizacaoUuid) {
      throw new BadRequestException('Você precisa criar uma organização antes de continuar.');
    }

    const rows = await this.perfilInstagramRepository.query(
      'SELECT id FROM public.organizacao WHERE uuid = $1',
      [organizacaoUuid],
    );

    if (!rows?.[0]?.id) {
      throw new BadRequestException('Organização não encontrada para o usuário atual.');
    }

    return Number(rows[0].id);
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
