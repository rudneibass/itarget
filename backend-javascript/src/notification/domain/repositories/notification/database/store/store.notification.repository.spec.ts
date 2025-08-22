import type { IDatabaseAdapter } from '@src/notification/domain/interfaces/database-adapter.interface';
import { NotificationEntity } from '@src/notification/domain/entities/notification/notification.entity';
import { StoreNotificationRepository } from './store.notification.repository';

describe('StoreNotificationRepository', () => {
  let repository: StoreNotificationRepository;
  let dbAdapter: IDatabaseAdapter;

  beforeEach(() => {
    dbAdapter = {
      insert: jest.fn(),
    } as any;

    repository = new StoreNotificationRepository(dbAdapter);
  });

  it('should call db.insert with correct SQL and params', async () => {
    const notification = 
    new NotificationEntity({
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      message: 'Test notification message',
      status: 'pending'
    });

    const result = await repository.store(notification);

    expect(dbAdapter.insert).toHaveBeenCalledWith(
      `INSERT INTO "notification" (uuid, content, status) VALUES ($1, $2, $3) RETURNING id`,
      {
        uuid: notification.uuid, 
        message: notification.message,
        status: notification.status
      }
    );
  });
});