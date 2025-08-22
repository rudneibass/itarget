import { Module } from '@nestjs/common';
import { CreateNotificationController } from './infra/controllers/create/create.ntification.controller';
import { FindNotificationController } from './infra/controllers/find/find.notificarion.controller';
import { ProducerNotificationService } from './domain/services/producer/producer.notification.service';
import { ConsumerNotificationService } from './domain/services/consumer/consumer.notification.service';
import { StoreNotificationRepository } from './domain/repositories/notification/database/store/store.notification.repository';
import { DatabaseAdapter } from './infra/adapters/database/database.adapter';

@Module({
  controllers: [CreateNotificationController, FindNotificationController],
  providers: [
    ProducerNotificationService, 
    ConsumerNotificationService, 
    StoreNotificationRepository,
    {
      provide: 'IDatabaseAdapter',
      useClass: DatabaseAdapter,
    },
  ],
  exports: [],
})
export class NotificationrModule {}