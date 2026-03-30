import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { PermissaoUsuario } from '../../../social/models/permissao-usuario/permissao-usuario.entity';
import { Usuario } from '../../../social/models/usuario/usuario.entity';

/**
 * UsuarioSocialService
 * Gerencia APENAS usuários da rede social (social.usuario)
 * Trabalha com:
 *   - social.usuario (entidade principal)
 *   - permissao_usuario (permissões de posting)
 *
 * NÃO tem relação com:
 *   - usuario_organizacao (isso é para admin)
 *   - public.usuario (isso é admin login)
 */
@Injectable()
export class UsuarioSocialService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(PermissaoUsuario)
    private readonly permissaoRepository: Repository<PermissaoUsuario>,
  ) {}

  /**
   * Resolve UUID para entidade Usuario (com ID).
   * Pattern: Controller envia UUID → Service resolve para entity com ID → Logic usa ID
   */
  private async resolveByUuid(uuid: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { uuid },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário de rede social não encontrado');
    }

    return usuario;
  }

  /**
   * Valida se usuário pertence à organização da sessão (scope)
   */
  private validateOrganizationScope(usuario: Usuario, organizacaoId?: number) {
    if (organizacaoId && usuario.organizacaoId !== organizacaoId) {
      throw new NotFoundException('Usuário não encontrado na organização');
    }
  }

  /**
   * Busca todos os usuários de rede social
   * Opcional: filtrar por organizacaoId
   */
  async findAll(organizacaoId?: number) {
    const where = organizacaoId ? { organizacaoId } : {};
    const usuarios = await this.usuarioRepository.find({
      where,
      order: { id: 'DESC' },
    });

    const permissions = await this.permissaoRepository.find();
    const permissionMap = new Map(permissions.map((item) => [item.usuarioId, item]));

    return usuarios.map((usuario) => {
      const permission = permissionMap.get(usuario.id);
      return {
        ...usuario,
        podePostarMidia: permission?.podePostarMidia ?? false,
        podePostarLink: permission?.podePostarLink ?? false,
      };
    });
  }

  /**
   * Busca usuário por UUID
   */
  async get(uuid: string, organizacaoId?: number) {
    const usuario = await this.resolveByUuid(uuid);
    this.validateOrganizationScope(usuario, organizacaoId);

    const permission = await this.permissaoRepository.findOne({
      where: { usuarioId: usuario.id },
    });

    return {
      ...usuario,
      podePostarMidia: permission?.podePostarMidia ?? false,
      podePostarLink: permission?.podePostarLink ?? false,
    };
  }

  /**
   * Cria novo usuário de rede social
   */
  async create(payload: any, organizacaoId?: number) {
    if (!organizacaoId || !Number.isInteger(organizacaoId) || organizacaoId <= 0) {
      throw new BadRequestException('Organização inválida');
    }

    const saved = await this.usuarioRepository.manager.transaction(async (entityManager) => {
      const usuarioRepository = entityManager.getRepository(Usuario);
      const permissaoRepository = entityManager.getRepository(PermissaoUsuario);

      const usuario = usuarioRepository.create({
        uuid: randomUUID(),
        organizacaoId,
        nome: payload.nome,
        apelido: payload.apelido || null,
        urlAvatar: payload.urlAvatar || null,
        hashQr: randomUUID(),
        moedas: Number(payload.moedas || 0),
        ativo: payload.ativo !== false,
      });

      const persisted = await usuarioRepository.save(usuario);

      // Criar permissões padrão
      const permission = permissaoRepository.create({
        usuarioId: persisted.id,
        podePostarMidia: Boolean(payload.podePostarMidia),
        podePostarLink: Boolean(payload.podePostarLink),
      });
      await permissaoRepository.save(permission);

      return persisted;
    });

    return this.get(saved.uuid, organizacaoId);
  }

  /**
   * Atualiza usuário de rede social
   */
  async update(uuid: string, payload: any, organizacaoId?: number) {
    const usuario = await this.resolveByUuid(uuid);
    this.validateOrganizationScope(usuario, organizacaoId);

    usuario.nome = payload.nome ?? usuario.nome;
    usuario.apelido = payload.apelido ?? usuario.apelido;
    usuario.urlAvatar = payload.urlAvatar ?? usuario.urlAvatar;
    usuario.moedas = payload.moedas !== undefined ? Number(payload.moedas) : usuario.moedas;
    usuario.ativo = typeof payload.ativo === 'boolean' ? payload.ativo : usuario.ativo;

    await this.usuarioRepository.save(usuario);

    // Atualizar permissões
    const existingPermission = await this.permissaoRepository.findOne({
      where: { usuarioId: usuario.id },
    });

    if (!existingPermission) {
      const newPermission = this.permissaoRepository.create({
        usuarioId: usuario.id,
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

  /**
   * Remove usuário de rede social
   */
  async remove(uuid: string, organizacaoId?: number) {
    const usuario = await this.resolveByUuid(uuid);
    this.validateOrganizationScope(usuario, organizacaoId);

    await this.permissaoRepository.delete({ usuarioId: usuario.id });
    await this.usuarioRepository.remove(usuario);
  }
}
