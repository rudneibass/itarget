import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, randomUUID, scryptSync } from 'node:crypto';
import { Repository } from 'typeorm';
import { CreateUsuarioAdminDto } from '../../dtos/usuario-admin/create-usuario-admin.dto';
import { UpdateUsuarioAdminDto } from '../../dtos/usuario-admin/update-usuario-admin.dto';
import { UsuarioAdmin } from '../../models/usuario-admin/usuario-admin.entity';

@Injectable()
export class UsuarioAdminService {
  constructor(
    @InjectRepository(UsuarioAdmin)
    private readonly usuarioAdminRepository: Repository<UsuarioAdmin>,
  ) {}

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 32).toString('hex');
    return `${salt}:${hash}`;
  }

  private sanitize(user: UsuarioAdmin) {
    const { senhaHash, ...safeUser } = user;
    return safeUser;
  }

  async findAll() {
    const users = await this.usuarioAdminRepository.find({ order: { id: 'DESC' } });
    return users.map((item) => this.sanitize(item));
  }

  async get(uuid: string) {
    const user = await this.usuarioAdminRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('Usuário admin não encontrado');
    }

    return this.sanitize(user);
  }

  async create(payload: CreateUsuarioAdminDto) {
    const email = (payload.email || '').trim().toLowerCase();
    const nome = (payload.nome || '').trim();
    const senha = payload.senha || '';

    const existingByEmail = await this.usuarioAdminRepository.findOne({ where: { email } });
    if (existingByEmail) {
      throw new BadRequestException('Já existe um usuário com este email.');
    }

    const user = this.usuarioAdminRepository.create({
      uuid: randomUUID(),
      nome,
      email,
      senhaHash: this.hashPassword(senha),
      organizacaoUuid: payload.organizacaoUuid || null,
      ativo: payload.ativo ?? true,
    });

    const saved = await this.usuarioAdminRepository.save(user);
    return this.sanitize(saved);
  }

  async update(uuid: string, payload: UpdateUsuarioAdminDto) {
    const user = await this.usuarioAdminRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('Usuário admin não encontrado');
    }

    if (payload.email) {
      const email = payload.email.trim().toLowerCase();
      const existingByEmail = await this.usuarioAdminRepository.findOne({ where: { email } });
      if (existingByEmail && existingByEmail.uuid !== uuid) {
        throw new BadRequestException('Já existe um usuário com este email.');
      }
      user.email = email;
    }

    if (payload.nome !== undefined) {
      user.nome = payload.nome.trim();
    }

    if (payload.organizacaoUuid !== undefined) {
      user.organizacaoUuid = payload.organizacaoUuid || null;
    }

    if (typeof payload.ativo === 'boolean') {
      user.ativo = payload.ativo;
    }

    if (payload.senha) {
      user.senhaHash = this.hashPassword(payload.senha);
    }

    await this.usuarioAdminRepository.save(user);
    return this.sanitize(user);
  }

  async remove(uuid: string) {
    const user = await this.usuarioAdminRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('Usuário admin não encontrado');
    }

    await this.usuarioAdminRepository.remove(user);
  }
}
