import { Module } from '@nestjs/common';
import { ProducerNotificationController } from './infra/controllers/producer/producer.ntification.controller';
import { ConsumerNotificationController } from './infra/controllers/consumer/consumer.notificarion.controller';
import { ProducerNotificationService } from './domain/services/producer/producer.notification.service';
import { ConsumerNotificationService } from './domain/services/consumer/consumer.notification.service';
import { StoreNotificationService } from './domain/services/store/store.notification.service';

@Module({
  controllers: [ProducerNotificationController, ConsumerNotificationController],
  providers: [ProducerNotificationService, ConsumerNotificationService, StoreNotificationService],
  exports: [],
})
export class NotificationrModule {}