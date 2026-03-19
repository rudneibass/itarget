import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { CreateOrganizacaoDto } from '../../dtos/organizacao/create-organizacao.dto';
import { UpdateOrganizacaoDto } from '../../dtos/organizacao/update-organizacao.dto';
import { UsuarioAdmin } from '../../models/usuario-admin/usuario-admin.entity';
import { Organizacao } from '../../../social/models/organizacao/organizacao.entity';

@Injectable()
export class OrganizacaoService {
  constructor(
    @InjectRepository(Organizacao)
    private readonly organizacaoRepository: Repository<Organizacao>,
    @InjectRepository(UsuarioAdmin)
    private readonly usuarioAdminRepository: Repository<UsuarioAdmin>,
  ) {}

  private async getOwnerUser(ownerUuid: string) {
    const user = await this.usuarioAdminRepository.findOne({ where: { uuid: ownerUuid } });
    if (!user) {
      throw new NotFoundException('Usuário do admin não encontrado.');
    }

    return user;
  }

  async findAll(ownerUuid: string) {
    const owner = await this.getOwnerUser(ownerUuid);

    if (!owner.organizacaoUuid) {
      return [];
    }

    const organizacao = await this.organizacaoRepository.findOne({ where: { uuid: owner.organizacaoUuid } });
    if (!organizacao) {
      return [];
    }

    return [organizacao];
  }

  async get(ownerUuid: string, uuid?: string) {
    const owner = await this.getOwnerUser(ownerUuid);

    if (!owner.organizacaoUuid) {
      throw new NotFoundException('Organização não encontrada');
    }

    if (uuid && owner.organizacaoUuid !== uuid) {
      throw new NotFoundException('Organização não encontrada');
    }

    const organizacao = await this.organizacaoRepository.findOne({ where: { uuid: owner.organizacaoUuid } });
    if (!organizacao) {
      throw new NotFoundException('Organização não encontrada');
    }

    return organizacao;
  }

  async create(ownerUuid: string, createOrganizacaoDto: CreateOrganizacaoDto): Promise<Organizacao> {
    try {
      const owner = await this.getOwnerUser(ownerUuid);

      if (owner.organizacaoUuid) {
        throw new BadRequestException('Este usuário já possui uma organização.');
      }

      const organizacao = this.organizacaoRepository.create({
        uuid: randomUUID(),
        nome: createOrganizacaoDto.nome,
        slug: createOrganizacaoDto.slug || null,
        ativo: createOrganizacaoDto.ativo ?? true,
      });

      const saved = await this.organizacaoRepository.save(organizacao);
      owner.organizacaoUuid = saved.uuid;
      await this.usuarioAdminRepository.save(owner);

      return saved;
    } catch (error) {
      throw error;
    }
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
