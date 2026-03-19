import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AdminAuthService } from '../services/auth/admin-auth.service';

@Injectable()
export class MiddlewareSessaoAdmin implements NestMiddleware {
  constructor(private readonly authService: AdminAuthService) {}

  private isHtmlRequest(req: Request) {
    const accept = req.headers.accept || '';
    return typeof accept === 'string' && accept.includes('text/html');
  }

  use(req: Request & { adminSession?: unknown }, res: Response, next: NextFunction) {
    const rawCookie = req.headers.cookie || '';
    const sidCookie = rawCookie
      .split(';')
      .map((chunk) => chunk.trim())
      .find((chunk) => chunk.startsWith('school_admin_sid='));

    if (!sidCookie) {
      if (req.method === 'GET' && this.isHtmlRequest(req)) {
        return res.redirect('/landing');
      }
      throw new UnauthorizedException('Sessão do admin não encontrada.');
    }

    const sessaoId = sidCookie.split('=')[1];
    const session = this.authService.obterSessao(sessaoId);

    if (!session) {
      res.clearCookie('school_admin_sid');
      if (req.method === 'GET' && this.isHtmlRequest(req)) {
        return res.redirect('/landing');
      }
      throw new UnauthorizedException('Sessão do admin inválida ou expirada.');
    }

    req.adminSession = session;
    return next();
  }
}
