import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import { Repository } from 'typeorm';
import { UsuarioAdmin } from '../../models/usuario-admin/usuario-admin.entity';
import { AdminSessionData, AdminSessionService } from './admin-session.service';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(UsuarioAdmin)
    private readonly usuarioAdminRepository: Repository<UsuarioAdmin>,
    private readonly adminSessionService: AdminSessionService,
  ) {}

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 32).toString('hex');
    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, savedHash: string): boolean {
    const [salt, hash] = (savedHash || '').split(':');
    if (!salt || !hash) {
      return false;
    }

    const hashBuffer = Buffer.from(hash, 'hex');
    const comparedBuffer = scryptSync(password, salt, 32);

    if (hashBuffer.length !== comparedBuffer.length) {
      return false;
    }

    return timingSafeEqual(hashBuffer, comparedBuffer);
  }

  async register(payload: { nome: string; email: string; senha: string }): Promise<AdminSessionData> {
    const nome = (payload.nome || '').trim();
    const email = (payload.email || '').trim().toLowerCase();
    const senha = payload.senha || '';

    if (!nome || !email || !senha) {
      throw new BadRequestException('Nome, email e senha são obrigatórios.');
    }

    const exists = await this.usuarioAdminRepository.findOne({ where: { email } });
    if (exists) {
      throw new BadRequestException('Já existe um usuário com este email.');
    }

    const user = this.usuarioAdminRepository.create({
      uuid: randomUUID(),
      nome,
      email,
      senhaHash: this.hashPassword(senha),
      ativo: true,
    });

    const saved = await this.usuarioAdminRepository.save(user);

    return this.adminSessionService.create({
      uuid: saved.uuid,
      nome: saved.nome,
      email: saved.email,
    });
  }

  async login(payload: { email: string; senha: string }): Promise<AdminSessionData> {
    const email = (payload.email || '').trim().toLowerCase();
    const senha = payload.senha || '';

    if (!email || !senha) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const user = await this.usuarioAdminRepository.findOne({ where: { email } });
    if (!user || !user.ativo || !this.verifyPassword(senha, user.senhaHash)) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    return this.adminSessionService.create({
      uuid: user.uuid,
      nome: user.nome,
      email: user.email,
    });
  }

  obterSessao(sessaoId: string) {
    return this.adminSessionService.get(sessaoId);
  }

  logout(sessaoId: string) {
    this.adminSessionService.delete(sessaoId);
  }
}
