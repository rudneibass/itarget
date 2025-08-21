import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';
import { StoreNotificationService } from '@src/notification/domain/services/store/store.notification.service';
import { NotificationEntity } from '@src/notification/domain/entities/notification/notification.entity';
import { CreateNotificationRepository } from '@src/notification/domain/repositories/notification/database/create/create.notification.repository';

@Injectable()
export class ConsumerNotificationService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private readonly queue = 'fila.notificacao.entrada.rudnei';
  private readonly statusQueue = 'fila.notificacao.status.rudnei';
  private readonly logger = new Logger(ConsumerNotificationService.name);

  constructor(
    private readonly statusStore: StoreNotificationService,
    private readonly createNotificationRepository: CreateNotificationRepository
  ) {}

  async onModuleInit() {
    await this.connect();
    await this.setupQueues();
    this.startConsumer();
    this.logger.log(`Consumidor iniciado na fila: ${this.queue}`);
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }

  // 🔹 Conexão com RabbitMQ
  private async connect() {
    this.connection = await amqp.connect({
      hostname: 'rabbitmq',
      port: 5672,
      username: 'admin',
      password: 'admin',
    });
    this.channel = await this.connection.createChannel();
  }

  // 🔹 Criação das filas
  private async setupQueues() {
    await this.channel.assertQueue(this.queue, { durable: true });
    await this.channel.assertQueue(this.statusQueue, { durable: true });
  }

  // 🔹 Início do consumo
  private startConsumer() {
    this.channel.consume(this.queue, async (message) => {
      if (!message) return;

      const content = message.content.toString();
      this.logger.log(`Mensagem recebida: ${content}`);

      try {
        const parsed = this.parseMessage(content);
        const notification = await this.persistNotification(parsed);
        const status = await this.processNotification(notification);

        await this.publishStatus(notification.uuid, status);
        this.channel.ack(message);
      } catch (error) {
        this.logger.error(`Erro no processamento: ${error.message}`);
        this.channel.ack(message);
      }
    });
  }

  // 🔹 Parse da mensagem
  private parseMessage(content: string): { messageId: string; conteudoMensagem: string } {
    try {
      const parsed = JSON.parse(content);
      if (!parsed.messageId || !parsed.conteudoMensagem) {
        throw new Error('Mensagem inválida: messageId ou conteudoMensagem ausente');
      }
      return parsed;
    } catch {
      throw new Error('Mensagem inválida (JSON parse falhou)');
    }
  }

  // 🔹 Persistência da notificação
  private async persistNotification(parsed: { messageId: string; conteudoMensagem: string }) {
    const notification = new NotificationEntity({
      uuid: parsed.messageId,
      message: parsed.conteudoMensagem,
      status: 'pendente',
    });

    await this.createNotificationRepository.create(notification);
    return notification;
  }

  // 🔹 Simulação de processamento (delay + status aleatório)
  private async processNotification(notification: NotificationEntity): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    const random = Math.floor(Math.random() * 10) + 1;
    const status = random <= 2 ? 'falha' : 'sucesso';

    this.statusStore.setStatus(notification.uuid, status);
    this.logger.log(`Notificação processada | ID: ${notification.uuid} | Status: ${status}`);
    return status;
  }

  // 🔹 Publicar status em outra fila
  private async publishStatus(messageId: string, status: string) {
    const statusPayload = JSON.stringify({ messageId, status });
    await this.channel.sendToQueue(this.statusQueue, Buffer.from(statusPayload), { persistent: true });
    this.logger.log(`Status publicado na fila: ${this.statusQueue} | ${statusPayload}`);
  }
}
