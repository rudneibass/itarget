import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

export interface AdminSessionUser {
  uuid: string;
  nome: string;
  email: string;
}

export interface AdminSessionData {
  sessaoId: string;
  usuario: AdminSessionUser;
  criadoEm: Date;
  atualizadoEm: Date;
}

@Injectable()
export class AdminSessionService {
  private readonly ttlMs = Number(process.env.ADMIN_SESSION_TTL_MS || 1000 * 60 * 60 * 8);

  private readonly sessions = new Map<string, AdminSessionData>();

  create(user: AdminSessionUser): AdminSessionData {
    const sessaoId = randomUUID();
    const now = new Date();

    const session: AdminSessionData = {
      sessaoId,
      usuario: {
        uuid: user.uuid,
        nome: user.nome,
        email: user.email,
      },
      criadoEm: now,
      atualizadoEm: now,
    };

    this.sessions.set(sessaoId, session);
    return session;
  }

  get(sessaoId: string): AdminSessionData | null {
    const session = this.sessions.get(sessaoId);
    if (!session) {
      return null;
    }

    const expired = Date.now() - session.atualizadoEm.getTime() > this.ttlMs;
    if (expired) {
      this.sessions.delete(sessaoId);
      return null;
    }

    session.atualizadoEm = new Date();
    this.sessions.set(sessaoId, session);
    return session;
  }

  delete(sessaoId: string) {
    this.sessions.delete(sessaoId);
  }
}
