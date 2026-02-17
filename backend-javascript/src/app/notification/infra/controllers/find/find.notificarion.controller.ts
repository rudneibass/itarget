import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Notificações')
@Controller('notification')
export class FindNotificationController {

  @Get('status/:id')
  @ApiOperation({ summary: 'Consulta o status de uma notificação pelo mensagemId' })
  @ApiParam({ name: 'id', description: 'UUID da mensagem' })
  @ApiResponse({ status: 200, description: 'Status encontrado', schema: { example: { mensagemId: 'uuid', status: 'sucesso' } } })
  @ApiResponse({ status: 404, description: 'Status não encontrado para o mensagemId informado.' })
  handle(@Param('id') id: string) {
    return { messageId: 'mocked', status: 'Mocked' };
  }
}