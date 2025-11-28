import { Injectable, OnModuleInit, OnModuleDestroy, Logger, Inject } from '@nestjs/common';
import { NotificationEntity } from '@src/notification/domain/entities/notification/notification.entity';
import { StoreNotificationRepository } from '@src/notification/domain/repositories/notification/database/store/store.notification.repository';
import type { WebSocketInterface } from '../../interfaces/websocket.interface';
import type { AmqpInterface } from '../../interfaces/amqp.interface';

@Injectable()
export class ConsumerNotificationService implements OnModuleInit, OnModuleDestroy {
  private notification: NotificationEntity;
  private readonly queue = 'fila.notificacao.entrada.rudnei';
  private readonly statusQueue = 'fila.notificacao.status.rudnei';
  private readonly logger = new Logger(ConsumerNotificationService.name);

  constructor(
    private readonly storeNotificationRepository: StoreNotificationRepository,
    @Inject('WebSocketInterface') private readonly webSocketAdapter: WebSocketInterface,
    @Inject('AmqpInterface') private readonly amqp: AmqpInterface
  ) {}

  async onModuleInit() {
    await this.amqp.connect();
    await this.setupQueues();
    this.startConsumer();
    this.logger.log(`Consumidor iniciado na fila: ${this.queue}`);
  }

  async onModuleDestroy() {
    await this.amqp.close();
  }

  private async setupQueues() {
    await this.amqp.assertQueue(this.queue, { durable: true });
    await this.amqp.assertQueue(this.statusQueue, { durable: true });
  }

  private startConsumer() {
    this.amqp.consume(this.queue, async (message) => {
      const content = message.content.toString();
      this.logger.log(`Mensagem recebida: ${content}`);

      try {
        const parsed = this.parseMessage(content);
        const notification = await this.persistNotification(parsed);
        const status = await this.processNotification(notification);
        // Persistir o novo status no banco de dados após o processamento
        await this.publishStatus(notification.uuid, status);
        await this.webSocketAdapter.broadcast(notification.message);

        this.amqp.ack(message);
      } catch (error) {
        this.logger.error(`Erro no processamento: ${error.message}`);
        this.amqp.ack(message);      }
    });
  }

  private parseMessage(content: string): { uuid: string; message: string } {
    try {
      const parsed = JSON.parse(content);
      if (!parsed.uuid || !parsed.message) {
        throw new Error('Mensagem inválida: uuid ou message ausente');
      }
      return parsed;
    } catch {
      throw new Error('Mensagem inválida (JSON parse falhou)');
    }
  }

  private async persistNotification(parsed: { uuid: string; message: string }) {
    this.notification = new NotificationEntity({
      uuid: parsed.uuid,
      message: parsed.message,
      status: 'pending',
    });

    await this.storeNotificationRepository.store(this.notification);
    return this.notification;
  }

  private async processNotification(notification: NotificationEntity): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    const random = Math.floor(Math.random() * 10) + 1;
    const status = random <= 2 ? 'falha' : 'sucesso';
    this.logger.log(`Notificação processada | ID: ${notification.uuid} | Status: ${status}`);
    return status;
  }

  private async publishStatus(uuid: string, status: string) {
    const statusPayload = JSON.stringify({ uuid, status });
    await this.amqp.sendToQueue(this.statusQueue, Buffer.from(statusPayload), { persistent: true });
    this.logger.log(`Status publicado na fila: ${this.statusQueue} | ${statusPayload}`);
  }
}
