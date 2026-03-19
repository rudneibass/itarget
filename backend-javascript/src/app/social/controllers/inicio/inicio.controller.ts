import { Controller, Get, Req, Render } from '@nestjs/common';
import { AtividadeService } from '../../services/atividade/atividade-social.service';
import { ConversaService } from '../../services/conversa/conversa-social.service';
import { EconomiaService } from '../../services/economia/economia-social.service';
import { PublicacaoService } from '../../services/publicacao/publicacao-social.service';

@Controller('social')
export class InicioController {
  constructor(
    private readonly feedService: PublicacaoService,
    private readonly activityService: AtividadeService,
    private readonly economyService: EconomiaService,
    private readonly chatService: ConversaService,
  ) {}

  @Get('home')
  @Render('social/pages/home/home')
  async renderizarInicio(@Req() req: any) {
    const session = req.socialSession;
    const timeline = await this.feedService.listTimeline(session.organizacaoUuid, session.usuario.uuid);
    const activities = await this.activityService.listarAtividades(session.organizacaoUuid);
    const games = await this.economyService.listarJogos(session.organizacaoUuid);

    return {
      user: session.usuario,
      organization: session.organizacao,
      timeline,
      quickActivities: activities.slice(0, 4),
      quickGames: games.slice(0, 4),
      moedas: session.usuario.moedas,
    };
  }

  @Get('profile')
  @Render('social/pages/profile/profile')
  renderizarPerfil(@Req() req: any) {
    const session = req.socialSession;
    return {
      user: session.usuario,
      organization: session.organizacao,
      moedas: session.usuario.moedas,
    };
  }

  @Get('activities')
  @Render('social/pages/activities/activities')
  async renderizarAtividades(@Req() req: any) {
    const session = req.socialSession;
    const activities = await this.activityService.listarAtividades(session.organizacaoUuid);

    return {
      user: session.usuario,
      organization: session.organizacao,
      activities,
      moedas: session.usuario.moedas,
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

  @Get('rewards')
  @Render('social/pages/rewards/rewards')
  async renderizarRecompensas(@Req() req: any) {
    const session = req.socialSession;
    const rewards = await this.economyService.listarRecompensas(session.organizacaoUuid);

    return {
      user: session.usuario,
      organization: session.organizacao,
      rewards,
      moedas: session.usuario.moedas,
    };
  }

  @Get('chat')
  @Render('social/pages/chat/chat')
  async renderizarConversa(@Req() req: any) {
    const session = req.socialSession;
    const threads = await this.chatService.listarConversas(session);

    return {
      user: session.usuario,
      organization: session.organizacao,
      threads,
      moedas: session.usuario.moedas,
    };
  }
}
