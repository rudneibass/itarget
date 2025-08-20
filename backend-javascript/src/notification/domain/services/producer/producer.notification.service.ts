import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ProducerNotificationOutputDto } from './producer.notification.output.dto';
import { ProducerNotificationInputDto } from './producer.notification.input.dto';

@Injectable()
export class ProducerNotificationService implements OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queue = 'fila.notificacao.entrada.rudnei';

  async execute(inputDto: ProducerNotificationInputDto): Promise<ProducerNotificationOutputDto> {
    const channel = await this.getChannel();
    const payload = JSON.stringify(inputDto);
    await channel.sendToQueue(this.queue, Buffer.from(payload), { persistent: true });
    return { messageId: inputDto.messageId };
  }

  private async getChannel(): Promise<amqp.Channel> {
    if (!this.connection) {
      this.connection = await amqp.connect({
        hostname: 'rabbitmq',
        port: 5672,
        username: 'admin',
        password: 'admin',
      });
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queue, { durable: true });
    }
    return this.channel;
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }
}