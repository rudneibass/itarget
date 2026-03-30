import { Controller, Get, Req, Render } from '@nestjs/common';
import { EconomiaService } from '../../services/economia/economia-social.service';
import { PublicacaoService } from '../../services/publicacao/publicacao-social.service';

@Controller('social')
export class InicioController {
  constructor(
    private readonly feedService: PublicacaoService,
    private readonly economyService: EconomiaService,
  ) {}

  @Get('home')
  @Render('social/pages/home/home')
  async renderizarInicio(@Req() req: any) {
    const session = req.socialSession;
    const allTimeline = await this.feedService.listTimeline(session.organizacaoUuid, session.usuario.uuid);
    const timeline = allTimeline.filter((post) => !post.isInstagram);
    const games = await this.economyService.listarJogos(session.organizacaoUuid);

    return {
      user: session.usuario,
      organization: session.organizacao,
      timeline,
      quickGames: games.slice(0, 4),
      moedas: session.usuario.moedas,
    };
  }

  @Get('shorts')
  @Render('social/pages/shorts/shorts')
  async renderizarShorts(@Req() req: any) {
    const session = req.socialSession;
    const timeline = await this.feedService.listTimeline(session.organizacaoUuid, session.usuario.uuid);

    return {
      user: session.usuario,
      organization: session.organizacao,
      timeline,
      moedas: session.usuario.moedas,
    };
  }

  @Get('profile')
  @Render('social/pages/profile/profile')
  async renderizarPerfil(@Req() req: any) {
    const session = req.socialSession;
    const timeline = await this.feedService.listTimeline(session.organizacaoUuid, session.usuario.uuid);
    const profileTimeline = timeline.filter((post) => post.isOwnPost && !post.isInstagram);

    return {
      user: session.usuario,
      organization: session.organizacao,
      moedas: session.usuario.moedas,
      profileTimeline,
      postsCount: profileTimeline.length,
    };
  }

  @Get('games')
  @Render('social/pages/games/games')
  async renderizarJogos(@Req() req: any) {
    const session = req.socialSession;
    const games = await this.economyService.listarJogos(session.organizacaoUuid);

    return {
      user: session.usuario,
      organization: session.organizacao,
      games,
      moedas: session.usuario.moedas,
    };
  }
}
