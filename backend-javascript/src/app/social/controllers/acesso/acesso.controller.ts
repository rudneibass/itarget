import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AutenticacaoService } from '../../services/autenticacao/autenticacao-social.service';

@Controller('social/access')
export class AcessoController {
  constructor(private readonly authService: AutenticacaoService) {}

  @Get()
  @Render('social/pages/access/access')
  renderAccess() {
    return {
      erro: 'Use o QRCode fornecido pela organizacao para acessar a rede social.',
    };
  }

  @Get(':organizacaoUuid/:userHash')
  async accessByQr(
    @Param('organizacaoUuid') organizacaoUuid: string,
    @Param('userHash') userHash: string,
    @Res() res: Response,
  ) {
    try {
      const session = await this.authService.authenticateByQr(organizacaoUuid, userHash);
      res.cookie('school_social_sid', session.sessaoId, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 12,
      });

      return res.redirect('/social/home');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha no acesso via QRCode';
      return res.status(401).render('social/pages/access/access', { erro: message });
    }
  }
}
