import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class ProducerNotificationService implements OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queue = 'fila.notificacao.entrada.rudnei';

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
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

  async publishNotification(messageId: string, messageContent: string): Promise<void> {
    const channel = await this.getChannel();
    const payload = JSON.stringify({ messageId, messageContent });
    await channel.sendToQueue(this.queue, Buffer.from(payload), { persistent: true });
  }
}