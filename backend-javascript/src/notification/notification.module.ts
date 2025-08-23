import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateNotificationController } from './infra/controllers/create/create.ntification.controller';
import { FindNotificationController } from './infra/controllers/find/find.notificarion.controller';
import { ProducerNotificationService } from './domain/services/producer/producer.notification.service';
import { ConsumerNotificationService } from './domain/services/consumer/consumer.notification.service-old';
import { StoreNotificationRepository } from './domain/repositories/notification/database/store/store.notification.repository';
import { DatabaseAdapter } from './infra/adapters/database/database.adapter';
import { WebSocketAdapter } from './infra/adapters/websocket/websocket.adapter';
import { AmqpAdapter } from './infra/adapters/amqp/amqp.adapter';
@Module({
  controllers: [
    CreateNotificationController, 
    FindNotificationController
  ],
  providers: [
    ProducerNotificationService, 
    ConsumerNotificationService, 
    StoreNotificationRepository,
    {
      provide: 'IDatabaseAdapter',
      useClass: DatabaseAdapter,
    },
    {
      provide: 'WebSocketInterface',
      useClass: WebSocketAdapter,
    },
    {
      provide: 'AmqpInterface',
      useClass: AmqpAdapter,
    },
  ],
  imports: [
    ConfigModule.forRoot()
  ],
  exports: [],
})
export class NotificationrModule {}