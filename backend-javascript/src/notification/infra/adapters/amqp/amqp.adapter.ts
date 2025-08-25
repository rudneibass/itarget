import * as amqp from 'amqplib';
import { ConfigService } from '@nestjs/config';
import { AmqpInterface } from '@src/notification/domain/interfaces/amqp.interface';

export class AmqpAdapter implements AmqpInterface {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private readonly configService: ConfigService) {}

  async connect(): Promise<void> {
    this.connection = await amqp.connect({
      hostname: this.configService.get<string>('RABBITMQ_HOST', 'rabbitmq'),
      port: this.configService.get<number>('RABBITMQ_PORT', 5672),
      username: this.configService.get<string>('RABBITMQ_USER', 'admin'),
      password: this.configService.get<string>('RABBITMQ_PASS', 'admin'),
    });

    this.channel = await this.connection.createChannel();
  }

  async assertQueue(queue: string, options?: any): Promise<void> {
    await this.channel.assertQueue(queue, options);
  }

  async consume(queue: string, onMessage: (msg: amqp.ConsumeMessage) => Promise<void>): Promise<void> {
    await this.channel.consume(queue, async (msg) => {
      if (msg) {
        await onMessage(msg);
      }
    });
  }

  ack(message: amqp.ConsumeMessage): void {
    this.channel.ack(message);
  }

  async sendToQueue(queue: string, content: Buffer, options?: any): Promise<void> {
    this.channel.sendToQueue(queue, content, options);
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
  }
}
