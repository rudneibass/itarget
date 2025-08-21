import { Module } from '@nestjs/common';
import { CreateNotificationController } from './infra/controllers/create/create.ntification.controller';
import { FindNotificationController } from './infra/controllers/find/find.notificarion.controller';
import { ProducerNotificationService } from './domain/services/producer/producer.notification.service';
import { ConsumerNotificationService } from './domain/services/consumer/consumer.notification.service';
import { StoreNotificationService } from './domain/services/store/store.notification.service';
import { CreateNotificationRepository } from './domain/repositories/notification/database/create/create.notification.repository';
import { DatabaseAdapter } from './infra/adapters/database/database.adapter';

@Module({
  controllers: [CreateNotificationController, FindNotificationController],
  providers: [
    ProducerNotificationService, 
    ConsumerNotificationService, 
    CreateNotificationRepository,
    {
      provide: 'IDatabaseAdapter',
      useClass: DatabaseAdapter,
    },
    StoreNotificationService
  ],
  exports: [],
})
export class NotificationrModule {}