import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AutenticacaoService } from '../services/autenticacao/autenticacao-social.service';

@Injectable()
export class MiddlewareSessaoSocial implements NestMiddleware {
  constructor(private readonly authService: AutenticacaoService) {}

  use(req: Request & { socialSession?: unknown }, res: Response, next: NextFunction) {
    if (req.path.startsWith('/social/access')) {
      return next();
    }

    const rawCookie = req.headers.cookie || '';
    const sidCookie = rawCookie
      .split(';')
      .map((item) => item.trim())
      .find((item) => item.startsWith('school_social_sid='));

    if (!sidCookie) {
      return res.redirect('/social/access');
    }

    const sessaoId = sidCookie.split('=')[1];
    const session = this.authService.obterSessao(sessaoId);

    if (!session) {
      res.clearCookie('school_social_sid');
      return res.redirect('/social/access');
    }

    req.socialSession = session;
    return next();
  }
}
