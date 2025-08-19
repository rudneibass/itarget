import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';
import { StoreNotificationService } from '@src/notification/domain/services/store/store.notification.service';


@Injectable()
export class ConsumerNotificationService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queue = 'fila.notificacao.entrada.rudnei';
  private readonly statusQueue = 'fila.notificacao.status.rudnei';
  private readonly logger = new Logger(ConsumerNotificationService.name);

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

    this.channel.consume(this.queue, async (msg) => {
      if (msg) {
        const content = msg.content.toString();
        this.logger.log(`Mensagem recebida: ${content}`);

        let mensagemId: string;

        try {
          const parsed = JSON.parse(content);
          mensagemId = parsed.mensagemId || parsed.messageId;

        } catch {
          this.logger.error('Mensagem inválida, ignorando.');
          this.channel.ack(msg);
          return;
        }
        if (!mensagemId) {
          this.logger.error('mensagemId ausente na mensagem, ignorando.');
          this.channel.ack(msg);
          return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        const random = Math.floor(Math.random() * 10) + 1;
        const status = random <= 2 ? 'falha' : 'sucesso';

        this.statusStore.setStatus(mensagemId, status);

        const statusPayload = JSON.stringify({ mensagemId, status });
        await this.channel.sendToQueue(this.statusQueue, Buffer.from(statusPayload), { persistent: true });

        this.logger.log(`Processamento concluído: ${content} | Status: ${status}`);
        this.channel.ack(msg);
      }
    });
    this.logger.log(`Consumidor iniciado na fila: ${this.queue}`);
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }
}