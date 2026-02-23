import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ResponderAtividadeDto } from '../../dtos/atividade/responder-atividade.dto';
import { AtividadeService } from '../../services/atividade/atividade-social.service';

@Controller('social/activity')
export class AtividadeController {
  constructor(private readonly activityService: AtividadeService) {}

  @Get('list')
  async list(@Req() req: any) {
    const data = await this.activityService.listarAtividades(req.socialSession.organizacaoUuid);
    return { data };
  }

  @Post(':atividadeUuid/start')
  async start(@Req() req: any, @Param('atividadeUuid') atividadeUuid: string) {
    const data = await this.activityService.iniciarAtividade(req.socialSession, atividadeUuid);
    return { data };
  }

  @Post('answer')
  async answer(@Req() req: any, @Body() dto: ResponderAtividadeDto) {
    const data = await this.activityService.responderPergunta(req.socialSession, dto);
    return { data };
  }
}
