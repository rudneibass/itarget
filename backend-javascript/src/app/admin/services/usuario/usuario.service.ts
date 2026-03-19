import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { Organizacao } from '../../../social/models/organizacao/organizacao.entity';
import { PermissaoUsuario } from '../../../social/models/permissao-usuario/permissao-usuario.entity';
import { Usuario } from '../../../social/models/usuario/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(PermissaoUsuario)
    private readonly permissaoRepository: Repository<PermissaoUsuario>,
    @InjectRepository(Organizacao)
    private readonly organizacaoRepository: Repository<Organizacao>,
  ) {}

  async listOrganizations() {
    return this.organizacaoRepository.find({ where: { ativo: true }, order: { nome: 'ASC' } });
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

  async create(payload: any) {
    const user = this.usuarioRepository.create({
      uuid: randomUUID(),
      organizacaoUuid: payload.organizacaoUuid,
      nome: payload.nome,
      apelido: payload.apelido || null,
      urlAvatar: payload.urlAvatar || null,
      hashQr: randomUUID(),
      moedas: Number(payload.moedas || 0),
      ativo: payload.ativo !== false,
    });

    const saved = await this.usuarioRepository.save(user);

    const permission = this.permissaoRepository.create({
      usuarioUuid: saved.uuid,
      podePostarMidia: Boolean(payload.podePostarMidia),
      podePostarLink: Boolean(payload.podePostarLink),
    });
    await this.permissaoRepository.save(permission);

    return this.get(saved.uuid);
  }

  async update(uuid: string, payload: any) {
    const user = await this.usuarioRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    user.organizacaoUuid = payload.organizacaoUuid ?? user.organizacaoUuid;
    user.nome = payload.nome ?? user.nome;
    user.apelido = payload.apelido ?? user.apelido;
    user.urlAvatar = payload.urlAvatar ?? user.urlAvatar;
    user.moedas = payload.moedas !== undefined ? Number(payload.moedas) : user.moedas;
    user.ativo = typeof payload.ativo === 'boolean' ? payload.ativo : user.ativo;
    await this.usuarioRepository.save(user);

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
