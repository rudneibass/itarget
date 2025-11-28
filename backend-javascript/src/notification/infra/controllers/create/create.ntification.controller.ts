import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProducerNotificationInputDto } from '@src/notification/domain/services/producer/producer.notification.input.dto';
import { ProducerNotificationService } from '@src/notification/domain/services/producer/producer.notification.service';

@ApiTags('Notificações')
@Controller('notification')
export class CreateNotificationController {
  constructor(private readonly notificationService: ProducerNotificationService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Envia notificação' })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiBody({ type: ProducerNotificationInputDto })
  @ApiResponse({ type: ProducerNotificationInputDto })
  async handle(@Body() body) {
    const { uuid, message } = body;
    return await this.notificationService.execute({uuid, message});
  }
}