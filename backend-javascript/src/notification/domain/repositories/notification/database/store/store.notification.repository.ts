import { Inject, Injectable } from "@nestjs/common";
import { NotificationEntity } from "@src/notification/domain/entities/notification/notification.entity";
import type { IDatabaseAdapter } from '@src/notification/domain/interfaces/database.interface';

@Injectable()
export class StoreNotificationRepository {
  constructor(@Inject('IDatabaseAdapter') private readonly db: IDatabaseAdapter) {}

  async store(notification: NotificationEntity): Promise< {id: string }> {
    return await 
    this.db.insert(
      `INSERT INTO "notification" (uuid, message, status) VALUES ($1, $2, $3) RETURNING id`,
      {
        uuid: notification.uuid, 
        message: notification.message,
        status: 'pending',
      }
    );
  }
}