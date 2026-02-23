import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { EconomiaService } from '../../services/economia/economia-social.service';

@Controller('social/economy')
export class EconomiaController {
  constructor(private readonly economyService: EconomiaService) {}

  @Get('games')
  async games(@Req() req: any) {
    const data = await this.economyService.listarJogos(req.socialSession.organizacaoUuid);
    return { data };
  }

  @Post('games/:jogoUuid/unlock')
  async liberarJogo(@Req() req: any, @Param('jogoUuid') jogoUuid: string) {
    const data = await this.economyService.liberarJogo(req.socialSession, jogoUuid);
    return { data };
  }

  @Get('rewards')
  async rewards(@Req() req: any) {
    const data = await this.economyService.listarRecompensas(req.socialSession.organizacaoUuid);
    return { data };
  }

  @Post('rewards/:recompensaUuid/redeem')
  async resgatarRecompensa(@Req() req: any, @Param('recompensaUuid') recompensaUuid: string) {
    const data = await this.economyService.resgatarRecompensa(req.socialSession, recompensaUuid);
    return { data };
  }
}
