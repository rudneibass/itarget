import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { StoreNotificationService } from '@src/notification/domain/services/store/store.notification.service';

@Controller('notification')
export class FindNotificationController {
  constructor(private readonly stroreNotificationService: StoreNotificationService) {}

  @Get('status/:id')
  @ApiOperation({ summary: 'Consulta o status de uma notificação pelo mensagemId' })
  @ApiParam({ name: 'id', description: 'UUID da mensagem' })
  @ApiResponse({ status: 200, description: 'Status encontrado', schema: { example: { mensagemId: 'uuid', status: 'sucesso' } } })
  @ApiResponse({ status: 404, description: 'Status não encontrado para o mensagemId informado.' })
  handle(@Param('id') id: string) {
    const status = this.stroreNotificationService.getStatus(id);
    if (!status) {
      throw new NotFoundException('Status não encontrado para o mensagemId informado.');
    }
    return { messageId: id, status };
  }
}