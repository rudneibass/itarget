import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

export interface DadosSessaoSocial {
  sessaoId: string;
  organizacaoUuid: string;
  organizacao: {
    nome: string;
    logoUrl: string | null;
  };
  usuario: {
    uuid: string;
    nome: string;
    urlAvatar: string | null;
    moedas: number;
    podePostarMidia: boolean;
    podePostarLink: boolean;
  };
  criadoEm: Date;
  atualizadoEm: Date;
}

@Injectable()
export class SessaoService {
  private readonly sessions = new Map<string, DadosSessaoSocial>();
  private readonly ttlMs = 1000 * 60 * 60 * 12;

  create(data: Omit<DadosSessaoSocial, 'sessaoId' | 'criadoEm' | 'atualizadoEm'>): DadosSessaoSocial {
    const sessaoId = randomUUID();
    const now = new Date();
    const session: DadosSessaoSocial = {
      ...data,
      sessaoId,
      criadoEm: now,
      atualizadoEm: now,
    };

    this.sessions.set(sessaoId, session);
    return session;
  }

  get(sessaoId: string): DadosSessaoSocial | null {
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

  atualizarMoedas(sessaoId: string, moedas: number): void {
    const session = this.sessions.get(sessaoId);
    if (!session) {
      return;
    }

    session.usuario.moedas = moedas;
    session.atualizadoEm = new Date();
    this.sessions.set(sessaoId, session);
  }

  delete(sessaoId: string): void {
    this.sessions.delete(sessaoId);
  }
}
