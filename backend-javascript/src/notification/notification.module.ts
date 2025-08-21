import { Module } from '@nestjs/common';
import { CreateNotificationController } from './infra/controllers/create/create.ntification.controller';
import { FindNotificationController } from './infra/controllers/find/find.notificarion.controller';
import { ProducerNotificationService } from './domain/services/producer/producer.notification.service';
import { ConsumerNotificationService } from './domain/services/consumer/consumer.notification.service';
import { StoreNotificationService } from './domain/services/store/store.notification.service';

@Module({
  controllers: [CreateNotificationController, FindNotificationController],
  providers: [ProducerNotificationService, ConsumerNotificationService, StoreNotificationService],
  exports: [],
})
export class NotificationrModule {}