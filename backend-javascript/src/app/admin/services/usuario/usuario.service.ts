import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { In, Repository } from 'typeorm';
import { Organizacao } from '../../../social/models/organizacao/organizacao.entity';
import { PermissaoUsuario } from '../../../social/models/permissao-usuario/permissao-usuario.entity';
import { Usuario } from '../../../social/models/usuario/usuario.entity';
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
    @InjectRepository(UsuarioOrganizacao)
    private readonly usuarioOrganizacaoRepository: Repository<UsuarioOrganizacao>,
  ) {}

  private async getOrganizationById(organizacaoId: number | null | undefined) {
    const normalizedId = Number(organizacaoId || 0);
    if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
      throw new BadRequestException('Organização inválida na sessão do usuário.');
    }

    const organizacao = await this.organizacaoRepository.findOne({ where: { id: normalizedId, ativo: true } });
    if (!organizacao) {
      throw new BadRequestException('Organização da sessão não encontrada ou inativa.');
    }

    return organizacao;
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

    return this.findColaboradoresByOrganizationId(organizacao.id);
  }

  async findColaboradoresByOrganizationId(organizacaoId: number | null | undefined) {
    if (!organizacaoId) {
      return [];
    }

    const vinculos = await this.usuarioOrganizacaoRepository.find({
      where: {
        organizacaoId,
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
    const permissionMap = new Map(permissions.map((item) => [item.usuarioId, item]));

    return usuarios.map((user) => {
      const permission = permissionMap.get(user.id);
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
    const permissionMap = new Map(permissions.map((item) => [item.usuarioId, item]));

    return users.map((user) => {
      const permission = permissionMap.get(user.id);
      return {
        ...user,
        podePostarMidia: permission?.podePostarMidia ?? false,
        podePostarLink: permission?.podePostarLink ?? false,
      };
    });
  }

  private async getOwnedUser(uuid: string, organizacaoId?: number) {
    const user = await this.usuarioRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (organizacaoId && user.organizacaoId !== organizacaoId) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async get(uuid: string, organizacaoId?: number) {
    const user = await this.getOwnedUser(uuid, organizacaoId);

    const permission = await this.permissaoRepository.findOne({ where: { usuarioId: user.id } });
    return {
      ...user,
      podePostarMidia: permission?.podePostarMidia ?? false,
      podePostarLink: permission?.podePostarLink ?? false,
    };
  }

  async create(payload: any, organizacaoId?: number) {
    const ownerOrganization = await this.getOrganizationById(organizacaoId);

    const saved = await this.usuarioRepository.manager.transaction(async (entityManager) => {
      const usuarioRepository = entityManager.getRepository(Usuario);
      const permissaoRepository = entityManager.getRepository(PermissaoUsuario);
      const usuarioOrganizacaoRepository = entityManager.getRepository(UsuarioOrganizacao);

      const user = usuarioRepository.create({
        uuid: randomUUID(),
        organizacaoId: ownerOrganization.id,
        nome: payload.nome,
        apelido: payload.apelido || null,
        urlAvatar: payload.urlAvatar || null,
        hashQr: randomUUID(),
        moedas: Number(payload.moedas || 0),
        ativo: payload.ativo !== false,
      });

      const persisted = await usuarioRepository.save(user);

      const permission = permissaoRepository.create({
        usuarioId: persisted.id,
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

  async update(uuid: string, payload: any, organizacaoId?: number) {
    const user = await this.getOwnedUser(uuid, organizacaoId);
    user.nome = payload.nome ?? user.nome;
    user.apelido = payload.apelido ?? user.apelido;
    user.urlAvatar = payload.urlAvatar ?? user.urlAvatar;
    user.moedas = payload.moedas !== undefined ? Number(payload.moedas) : user.moedas;
    user.ativo = typeof payload.ativo === 'boolean' ? payload.ativo : user.ativo;
    await this.usuarioRepository.save(user);

    const existingPermission = await this.permissaoRepository.findOne({ where: { usuarioId: user.id } });
    if (!existingPermission) {
      const newPermission = this.permissaoRepository.create({
        usuarioId: user.id,
        podePostarMidia: Boolean(payload.podePostarMidia),
        podePostarLink: Boolean(payload.podePostarLink),
      });
      await this.permissaoRepository.save(newPermission);
    } else {
      existingPermission.podePostarMidia = Boolean(payload.podePostarMidia);
      existingPermission.podePostarLink = Boolean(payload.podePostarLink);
      await this.permissaoRepository.save(existingPermission);
    }

    return this.get(uuid, organizacaoId);
  }

  async remove(uuid: string, organizacaoId?: number) {
    const user = await this.getOwnedUser(uuid, organizacaoId);

    await this.permissaoRepository.delete({ usuarioId: user.id });
    await this.usuarioRepository.remove(user);
  }
}
