import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CriarConversaDto } from '../../dtos/conversa/criar-conversa.dto';
import { EnviarMensagemConversaDto } from '../../dtos/conversa/enviar-mensagem-conversa.dto';
import { ConversaService } from '../../services/conversa/conversa-social.service';

@Controller('social/chat')
export class ConversaController {
  constructor(private readonly chatService: ConversaService) {}

  @Get('threads')
  async listarConversas(@Req() req: any) {
    const data = await this.chatService.listarConversas(req.socialSession);
    return { data };
  }

  @Post('threads')
  async criarConversa(@Req() req: any, @Body() dto: CriarConversaDto) {
    const data = await this.chatService.criarConversa(req.socialSession, dto);
    return { data };
  }

  @Get('threads/:conversaUuid/messages')
  async listarMensagens(@Req() req: any, @Param('conversaUuid') conversaUuid: string) {
    const data = await this.chatService.listarMensagens(req.socialSession, conversaUuid);
    return { data };
  }

  @Post('threads/:conversaUuid/messages')
  async enviarMensagem(
    @Req() req: any,
    @Param('conversaUuid') conversaUuid: string,
    @Body() dto: EnviarMensagemConversaDto,
  ) {
    const data = await this.chatService.enviarMensagem(req.socialSession, conversaUuid, dto);
    return { data };
  }
}
