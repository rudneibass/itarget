import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { In, Repository } from 'typeorm';
import { Organizacao } from '../../../social/models/organizacao/organizacao.entity';
import { PermissaoUsuario } from '../../../social/models/permissao-usuario/permissao-usuario.entity';
import { Usuario } from '../../../social/models/usuario/usuario.entity';
import { UsuarioAdmin } from '../../models/usuario-admin/usuario-admin.entity';
import { UsuarioOrganizacao } from '../../models/usuario-organizacao/usuario-organizacao.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(PermissaoUsuario)
    private readonly permissaoRepository: Repository<PermissaoUsuario>,
    @InjectRepository(Organizacao)
    private readonly organizacaoRepository: Repository<Organizacao>,
    @InjectRepository(UsuarioAdmin)
    private readonly usuarioAdminRepository: Repository<UsuarioAdmin>,
    @InjectRepository(UsuarioOrganizacao)
    private readonly usuarioOrganizacaoRepository: Repository<UsuarioOrganizacao>,
  ) {}

  private async getOwnedOrganization(ownerUuid: string) {
    const owner = await this.usuarioAdminRepository.findOne({ where: { uuid: ownerUuid } });
    if (!owner) {
      throw new NotFoundException('Usuário admin não encontrado');
    }

    const ownerVinculo = await this.usuarioOrganizacaoRepository.findOne({
      where: {
        usuarioId: owner.id,
        tipo: 'DONO',
        ativo: true,
      },
      order: { id: 'DESC' },
    });

    if (ownerVinculo) {
      const organizacaoByVinculo = await this.organizacaoRepository.findOne({
        where: { id: ownerVinculo.organizacaoId, ativo: true },
      });
      if (organizacaoByVinculo) {
        return organizacaoByVinculo;
      }
    }

    throw new BadRequestException('Primeiro é preciso criar uma organização para depois adicionar colaboradores.');
  }

  async listOrganizations() {
    return this.organizacaoRepository.find({ where: { ativo: true }, order: { nome: 'ASC' } });
  }

  async findColaboradores(organizacaoUuid: string | null | undefined) {
    if (!organizacaoUuid) {
      return [];
    }

    const organizacao = await this.organizacaoRepository.findOne({ where: { uuid: organizacaoUuid } });
    if (!organizacao) {
      return [];
    }

    const vinculos = await this.usuarioOrganizacaoRepository.find({
      where: {
        organizacaoId: organizacao.id,
        tipo: 'COLABORADOR',
        ativo: true,
      },
    });

    if (vinculos.length === 0) {
      return [];
    }

    const usuarioIds = vinculos.map((v) => v.usuarioId);
    const usuarios = await this.usuarioRepository.find({
      where: { id: In(usuarioIds) },
      order: { nome: 'ASC' },
    });

    const permissions = await this.permissaoRepository.find();
    const permissionMap = new Map(permissions.map((item) => [item.usuarioUuid, item]));

    return usuarios.map((user) => {
      const permission = permissionMap.get(user.uuid);
      return {
        ...user,
        podePostarMidia: permission?.podePostarMidia ?? false,
        podePostarLink: permission?.podePostarLink ?? false,
      };
    });
  }

  async findAll() {
    const users = await this.usuarioRepository.find({ order: { id: 'DESC' } });
    const permissions = await this.permissaoRepository.find();
    const permissionMap = new Map(permissions.map((item) => [item.usuarioUuid, item]));

    return users.map((user) => {
      const permission = permissionMap.get(user.uuid);
      return {
        ...user,
        podePostarMidia: permission?.podePostarMidia ?? false,
        podePostarLink: permission?.podePostarLink ?? false,
      };
    });
  }

  async get(uuid: string) {
    const user = await this.usuarioRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const permission = await this.permissaoRepository.findOne({ where: { usuarioUuid: uuid } });
    return {
      ...user,
      podePostarMidia: permission?.podePostarMidia ?? false,
      podePostarLink: permission?.podePostarLink ?? false,
    };
  }

  async create(payload: any, ownerUuid?: string) {
    const ownerOrganization = ownerUuid ? await this.getOwnedOrganization(ownerUuid) : null;
    const organizacaoUuid = ownerOrganization?.uuid;

    if (!organizacaoUuid) {
      throw new BadRequestException('Primeiro é preciso criar uma organização para depois adicionar colaboradores.');
    }

    const saved = await this.usuarioRepository.manager.transaction(async (entityManager) => {
      const usuarioRepository = entityManager.getRepository(Usuario);
      const permissaoRepository = entityManager.getRepository(PermissaoUsuario);
      const usuarioOrganizacaoRepository = entityManager.getRepository(UsuarioOrganizacao);

      const user = usuarioRepository.create({
        uuid: randomUUID(),
        organizacaoUuid,
        nome: payload.nome,
        apelido: payload.apelido || null,
        urlAvatar: payload.urlAvatar || null,
        hashQr: randomUUID(),
        moedas: Number(payload.moedas || 0),
        ativo: payload.ativo !== false,
      });

      const persisted = await usuarioRepository.save(user);

      const permission = permissaoRepository.create({
        usuarioUuid: persisted.uuid,
        podePostarMidia: Boolean(payload.podePostarMidia),
        podePostarLink: Boolean(payload.podePostarLink),
      });
      await permissaoRepository.save(permission);

      if (ownerOrganization) {
        const vinculo = usuarioOrganizacaoRepository.create({
          usuarioId: persisted.id,
          organizacaoId: ownerOrganization.id,
          tipo: 'COLABORADOR',
          ativo: true,
        });
        await usuarioOrganizacaoRepository.save(vinculo);
      }

      return persisted;
    });

    return this.get(saved.uuid);
  }

  async update(uuid: string, payload: any, ownerUuid?: string) {
    const user = await this.usuarioRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const ownerOrganization = ownerUuid ? await this.getOwnedOrganization(ownerUuid) : null;

    if (ownerOrganization) {
      user.organizacaoUuid = ownerOrganization.uuid;
    } else {
      user.organizacaoUuid = payload.organizacaoUuid ?? user.organizacaoUuid;
    }
    user.nome = payload.nome ?? user.nome;
    user.apelido = payload.apelido ?? user.apelido;
    user.urlAvatar = payload.urlAvatar ?? user.urlAvatar;
    user.moedas = payload.moedas !== undefined ? Number(payload.moedas) : user.moedas;
    user.ativo = typeof payload.ativo === 'boolean' ? payload.ativo : user.ativo;
    await this.usuarioRepository.save(user);

    if (ownerOrganization) {
      const existingVinculo = await this.usuarioOrganizacaoRepository.findOne({
        where: {
          usuarioId: user.id,
          organizacaoId: ownerOrganization.id,
        },
      });

      if (!existingVinculo) {
        const vinculo = this.usuarioOrganizacaoRepository.create({
          usuarioId: user.id,
          organizacaoId: ownerOrganization.id,
          tipo: 'COLABORADOR',
          ativo: true,
        });
        await this.usuarioOrganizacaoRepository.save(vinculo);
      } else {
        existingVinculo.tipo = 'COLABORADOR';
        existingVinculo.ativo = true;
        await this.usuarioOrganizacaoRepository.save(existingVinculo);
      }
    }

    const existingPermission = await this.permissaoRepository.findOne({ where: { usuarioUuid: uuid } });
    if (!existingPermission) {
      const newPermission = this.permissaoRepository.create({
        usuarioUuid: uuid,
        podePostarMidia: Boolean(payload.podePostarMidia),
        podePostarLink: Boolean(payload.podePostarLink),
      });
      await this.permissaoRepository.save(newPermission);
    } else {
      existingPermission.podePostarMidia = Boolean(payload.podePostarMidia);
      existingPermission.podePostarLink = Boolean(payload.podePostarLink);
      await this.permissaoRepository.save(existingPermission);
    }

    return this.get(uuid);
  }

  async remove(uuid: string) {
    const user = await this.usuarioRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.permissaoRepository.delete({ usuarioUuid: uuid });
    await this.usuarioRepository.remove(user);
  }
}
