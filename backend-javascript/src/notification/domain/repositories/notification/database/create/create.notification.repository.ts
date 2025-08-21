import { Inject, Injectable } from "@nestjs/common";
import { NotificationEntity } from "@src/notification/domain/entities/notification/notification.entity";
import type { IDatabaseAdapter } from '@src/notification/domain/interfaces/database-adapter.interface';

@Injectable()
export class CreateNotificationRepository {
  constructor(@Inject('IDatabaseAdapter') private readonly db: IDatabaseAdapter) {}

  async create(notification: NotificationEntity): Promise< {id: string }> {
    return await 
    this.db.insert(
      `INSERT INTO "notification" (uuid, content, status) VALUES ($1, $2, $3) RETURNING id`,
      {
        uuid: notification.uuid, 
        message: notification.message,
        status: notification.status
      }
    );
  }
}