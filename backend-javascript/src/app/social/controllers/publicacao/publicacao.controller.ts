import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CriarComentarioDto } from '../../dtos/publicacao/criar-comentario.dto';
import { CriarPublicacaoDto } from '../../dtos/publicacao/criar-publicacao.dto';
import { PublicacaoService } from '../../services/publicacao/publicacao-social.service';

@Controller('social/feed')
export class PublicacaoController {
  constructor(private readonly feedService: PublicacaoService) {}

  @Get('timeline')
  async timeline(@Req() req: any) {
    const session = req.socialSession;
    const data = await this.feedService.listTimeline(session.organizacaoUuid);
    return { data };
  }

  @Post('post')
  async criarPublicacao(@Req() req: any, @Body() dto: CriarPublicacaoDto) {
    const data = await this.feedService.criarPublicacao(req.socialSession, dto);
    return { data };
  }

  @Post('post/:publicacaoUuid/comment')
  async comment(@Req() req: any, @Param('publicacaoUuid') publicacaoUuid: string, @Body() dto: CriarComentarioDto) {
    const data = await this.feedService.adicionarComentario(req.socialSession, publicacaoUuid, dto);
    return { data };
  }

  @Post('post/:publicacaoUuid/like')
  async like(@Req() req: any, @Param('publicacaoUuid') publicacaoUuid: string) {
    const data = await this.feedService.alternarCurtida(req.socialSession, publicacaoUuid);
    return { data };
  }

  @Post('post/:publicacaoUuid/compartilhar')
  async compartilhar(@Req() req: any, @Param('publicacaoUuid') publicacaoUuid: string) {
    const data = await this.feedService.compartilhar(req.socialSession, publicacaoUuid);
    return { data };
  }
}
