import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';
import { StoreNotificationService } from '@src/notification/domain/services/store/store.notification.service';


@Injectable()
export class ConsumerNotificationServiceOld implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queue = 'fila.notificacao.entrada.rudnei';
  private readonly statusQueue = 'fila.notificacao.status.rudnei';
  private readonly logger = new Logger(ConsumerNotificationServiceOld.name);

  constructor(private readonly statusStore: StoreNotificationService) {}

  async onModuleInit() {
    this.connection = await amqp.connect({
      hostname: 'rabbitmq',
      port: 5672,
      username: 'admin',
      password: 'admin',
    });

    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });
    await this.channel.assertQueue(this.statusQueue, { durable: true });

    this.channel.consume(this.queue, async (message) => {
      if (message) {
        const content = message.content.toString();
        this.logger.log(`Mensagem recebida: ${content}`);
        let messageId: string;

        try {
          const parsed = JSON.parse(content);
          messageId = parsed.messageId

        } catch {
          this.logger.error('Mensagem inválida, ignorando.');
          this.channel.ack(message);
          return;
        }

        if (!messageId) {
          this.logger.error('messageId ausente na mensagem, ignorando.');
          this.channel.ack(message);
          return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        const random = Math.floor(Math.random() * 10) + 1;
        const status = random <= 2 ? 'falha' : 'sucesso';

        
        this.statusStore.setStatus(messageId, status);


        const statusPayload = JSON.stringify({ messageId, status });
        await this.channel.sendToQueue(this.statusQueue, Buffer.from(statusPayload), { persistent: true });

        this.logger.log(`Processamento concluído: ${content} | Status: ${status}`);
        this.channel.ack(message);
      }
    });
    this.logger.log(`Consumidor iniciado na fila: ${this.queue}`);
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }
}