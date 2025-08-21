import { Inject, Injectable } from "@nestjs/common";
import { NotificationEntity } from "@src/notification/domain/entities/notification/notification.entity";
import type { IDatabaseAdapter } from "@src/notification/domain/interfaces/database-adapter.interface";

@Injectable()
export class FindNotificationRepository {
  constructor(
    @Inject("IDatabaseAdapter") private readonly db: IDatabaseAdapter
  ) {}

  async findByUuid(uuid: string): Promise<NotificationEntity | null> {
    const result = await this.db.select(
      `SELECT id, uuid, content, status 
       FROM "notification" 
       WHERE uuid = $1 
       LIMIT 1`,
      [ uuid ]
    );

    if (!result || result.length === 0) {
      return null;
    }

    const row = result[0];
    return new NotificationEntity({
      uuid: row.uuid,
      message: row.content, 
      status: row.status,
    });
  }
}
