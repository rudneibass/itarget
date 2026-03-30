import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { CreateOrganizacaoDto } from '../../dtos/organizacao/create-organizacao.dto';
import { UpdateOrganizacaoDto } from '../../dtos/organizacao/update-organizacao.dto';
import { Arquivo } from '../../models/arquivo/arquivo.entity';
import { UsuarioAdmin } from '../../models/usuario-admin/usuario-admin.entity';
import { UsuarioOrganizacao } from '../../models/usuario-organizacao/usuario-organizacao.entity';
import { Organizacao } from '../../../social/models/organizacao/organizacao.entity';

@Injectable()
export class OrganizacaoService {
  constructor(
    @InjectRepository(Organizacao)
    private readonly organizacaoRepository: Repository<Organizacao>,
    @InjectRepository(Arquivo)
    private readonly arquivoRepository: Repository<Arquivo>,
    @InjectRepository(UsuarioAdmin)
    private readonly usuarioAdminRepository: Repository<UsuarioAdmin>,
    @InjectRepository(UsuarioOrganizacao)
    private readonly usuarioOrganizacaoRepository: Repository<UsuarioOrganizacao>,
  ) {}

  private async getOwnerUser(ownerUuid: string) {
    const user = await this.usuarioAdminRepository.findOne({ where: { uuid: ownerUuid } });
    if (!user) {
      throw new NotFoundException('Usuário do admin não encontrado.');
    }

    return user;
  }

  private normalizeOrganizationId(organizacaoId: number | null | undefined) {
    const normalized = Number(organizacaoId || 0);
    if (!Number.isInteger(normalized) || normalized <= 0) {
      return null;
    }

    return normalized;
  }

  private async getOwnedOrganization(owner: UsuarioAdmin) {
    const vinculo = await this.usuarioOrganizacaoRepository.findOne({
      where: {
        usuarioId: owner.id,
        tipo: 'DONO',
        ativo: true,
      },
      order: { id: 'DESC' },
    });

    if (vinculo) {
      const organizacaoByVinculo = await this.organizacaoRepository.findOne({ where: { id: vinculo.organizacaoId } });
      if (organizacaoByVinculo) {
        return organizacaoByVinculo;
      }
    }

    return null;
  }

  async getOwnedOrganizationUuid(ownerUuid: string) {
    const owner = await this.getOwnerUser(ownerUuid);
    const organizacao = await this.getOwnedOrganization(owner);
    return organizacao?.uuid ?? null;
  }

  async getOwnedOrganizationId(ownerUuid: string) {
    const owner = await this.getOwnerUser(ownerUuid);
    const organizacao = await this.getOwnedOrganization(owner);
    return organizacao?.id ?? null;
  }

  async getByOrganizationId(organizacaoId: number | null | undefined) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    if (!normalizedOrgId) {
      return null;
    }

    return this.organizacaoRepository.findOne({ where: { id: normalizedOrgId } });
  }

  private async resolveLogoUrl(organizacaoId: number) {
    const avatar = await this.arquivoRepository
      .createQueryBuilder('arquivo')
      .where('arquivo.entidadePai = :entidadePai', { entidadePai: 'organizacao' })
      .andWhere('arquivo.entidadePaiId = :entidadePaiId', { entidadePaiId: organizacaoId })
      .andWhere('LOWER(arquivo.tipo) LIKE :tipo', { tipo: 'image/%' })
      .orderBy('arquivo.id', 'DESC')
      .getOne();

    return avatar?.url ?? null;
  }

  private async attachLogo(organizacao: Organizacao) {
    const logoUrl = await this.resolveLogoUrl(organizacao.id);
    return {
      ...organizacao,
      logoUrl,
    };
  }

  async findAll(organizacaoId: number | null | undefined) {
    const organizacao = await this.getByOrganizationId(organizacaoId);
    if (!organizacao) {
      return [];
    }

    return [await this.attachLogo(organizacao)];
  }

  async get(organizacaoId: number | null | undefined, uuid?: string) {
    const organizacao = await this.getByOrganizationId(organizacaoId);
    if (!organizacao) {
      throw new NotFoundException('Organização não encontrada');
    }

    if (uuid && organizacao.uuid !== uuid) {
      throw new NotFoundException('Organização não encontrada');
    }

    return this.attachLogo(organizacao);
  }

  async create(
    ownerUuid: string,
    currentOrganizationId: number | null | undefined,
    createOrganizacaoDto: CreateOrganizacaoDto,
  ): Promise<Organizacao> {
    const owner = await this.getOwnerUser(ownerUuid);

    const normalizedOrgId = this.normalizeOrganizationId(currentOrganizationId);
    if (normalizedOrgId) {
      throw new BadRequestException('Este usuário já possui uma organização.');
    }

    const ownedOrganization = await this.getOwnedOrganization(owner);
    if (ownedOrganization) {
      throw new BadRequestException('Este usuário já possui uma organização.');
    }

    return this.organizacaoRepository.manager.transaction(async (entityManager) => {
      const organizacaoRepository = entityManager.getRepository(Organizacao);
      const usuarioOrganizacaoRepository = entityManager.getRepository(UsuarioOrganizacao);

      const organizacao = organizacaoRepository.create({
        uuid: randomUUID(),
        nome: createOrganizacaoDto.nome,
        slug: createOrganizacaoDto.slug || null,
        ativo: createOrganizacaoDto.ativo ?? true,
      });

      const saved = await organizacaoRepository.save(organizacao);

      const vinculo = usuarioOrganizacaoRepository.create({
        usuarioId: owner.id,
        organizacaoId: saved.id,
        tipo: 'DONO',
        criadoPorUsuarioId: owner.id,
        ativo: true,
      });

      await usuarioOrganizacaoRepository.save(vinculo);

      return saved;
    });
  }

  async update(
    organizacaoId: number | null | undefined,
    uuid: string,
    updateOrganizacaoDto: UpdateOrganizacaoDto,
  ): Promise<Organizacao> {
    try {
      const organizacao = await this.get(organizacaoId, uuid);
      organizacao.nome = updateOrganizacaoDto.nome ?? organizacao.nome;
      organizacao.slug = updateOrganizacaoDto.slug ?? organizacao.slug;
      organizacao.ativo = typeof updateOrganizacaoDto.ativo === 'boolean' ? updateOrganizacaoDto.ativo : organizacao.ativo;
      return this.organizacaoRepository.save(organizacao);
    } catch (error) {
      throw error;
    }
  }

  async remove(organizacaoId: number | null | undefined, uuid: string): Promise<void> {
    try {
      const organizacao = await this.get(organizacaoId, uuid);
      await this.organizacaoRepository.remove(organizacao);
    } catch (error) {
      throw error;
    }
  }
}
