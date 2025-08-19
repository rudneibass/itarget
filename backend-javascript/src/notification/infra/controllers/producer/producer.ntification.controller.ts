import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProducerNotificationInputDto } from '@src/notification/domain/services/producer/producer.notification.input.sto';
import { ProducerNotificationService } from '@src/notification/domain/services/producer/producer.notification.service';


@Controller('notification')
export class ProducerNotificationController {
  constructor(private readonly notificationService: ProducerNotificationService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia notificação' })
  @ApiBody({ type: ProducerNotificationInputDto })
  @ApiResponse({ status: 202, description: 'Mensagem enviada com sucesso.' })
  async handle(@Body() body: ProducerNotificationInputDto) {
    const { mensagemId, conteudoMensagem } = body;
    const mensageId = mensagemId?.trim();
    const messageContent = conteudoMensagem?.trim();
    await this.notificationService.publishNotification(mensageId, messageContent);
    return { mensageId };
  }
}