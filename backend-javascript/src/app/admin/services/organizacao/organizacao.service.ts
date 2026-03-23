import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { CreateOrganizacaoDto } from '../../dtos/organizacao/create-organizacao.dto';
import { UpdateOrganizacaoDto } from '../../dtos/organizacao/update-organizacao.dto';
import { UsuarioAdmin } from '../../models/usuario-admin/usuario-admin.entity';
import { UsuarioOrganizacao } from '../../models/usuario-organizacao/usuario-organizacao.entity';
import { Organizacao } from '../../../social/models/organizacao/organizacao.entity';

@Injectable()
export class OrganizacaoService {
  constructor(
    @InjectRepository(Organizacao)
    private readonly organizacaoRepository: Repository<Organizacao>,
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

    if (!owner.organizacaoUuid) {
      return null;
    }

    const organizacaoByOwner = await this.organizacaoRepository.findOne({ where: { uuid: owner.organizacaoUuid } });
    if (!organizacaoByOwner) {
      return null;
    }

    if (!vinculo) {
      const ownerVinculo = this.usuarioOrganizacaoRepository.create({
        usuarioId: owner.id,
        organizacaoId: organizacaoByOwner.id,
        tipo: 'DONO',
        criadoPorUsuarioId: owner.id,
        ativo: true,
      });
      await this.usuarioOrganizacaoRepository.save(ownerVinculo);
    }

    return organizacaoByOwner;
  }

  async getOwnedOrganizationUuid(ownerUuid: string) {
    const owner = await this.getOwnerUser(ownerUuid);
    const organizacao = await this.getOwnedOrganization(owner);
    return organizacao?.uuid ?? null;
  }

  async findAll(ownerUuid: string) {
    const owner = await this.getOwnerUser(ownerUuid);

    const organizacao = await this.getOwnedOrganization(owner);
    if (!organizacao) {
      return [];
    }

    return [organizacao];
  }

  async get(ownerUuid: string, uuid?: string) {
    const owner = await this.getOwnerUser(ownerUuid);

    const organizacao = await this.getOwnedOrganization(owner);
    if (!organizacao) {
      throw new NotFoundException('Organização não encontrada');
    }

    if (uuid && organizacao.uuid !== uuid) {
      throw new NotFoundException('Organização não encontrada');
    }

    return organizacao;
  }

  async create(ownerUuid: string, createOrganizacaoDto: CreateOrganizacaoDto): Promise<Organizacao> {
    const owner = await this.getOwnerUser(ownerUuid);

    const ownedOrganization = await this.getOwnedOrganization(owner);
    if (ownedOrganization) {
      throw new BadRequestException('Este usuário já possui uma organização.');
    }

    return this.organizacaoRepository.manager.transaction(async (entityManager) => {
      const organizacaoRepository = entityManager.getRepository(Organizacao);
      const usuarioAdminRepository = entityManager.getRepository(UsuarioAdmin);
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

      owner.organizacaoUuid = saved.uuid;
      await usuarioAdminRepository.save(owner);

      return saved;
    });
  }

  async update(ownerUuid: string, uuid: string, updateOrganizacaoDto: UpdateOrganizacaoDto): Promise<Organizacao> {
    try {
      const organizacao = await this.get(ownerUuid, uuid);
      organizacao.nome = updateOrganizacaoDto.nome ?? organizacao.nome;
      organizacao.slug = updateOrganizacaoDto.slug ?? organizacao.slug;
      organizacao.ativo = typeof updateOrganizacaoDto.ativo === 'boolean' ? updateOrganizacaoDto.ativo : organizacao.ativo;
      return this.organizacaoRepository.save(organizacao);
    } catch (error) {
      throw error;
    }
  }

  async remove(ownerUuid: string, uuid: string): Promise<void> {
    try {
      const owner = await this.getOwnerUser(ownerUuid);
      const organizacao = await this.get(ownerUuid, uuid);
      await this.organizacaoRepository.remove(organizacao);

      owner.organizacaoUuid = null;
      await this.usuarioAdminRepository.save(owner);
    } catch (error) {
      throw error;
    }
  }
}
