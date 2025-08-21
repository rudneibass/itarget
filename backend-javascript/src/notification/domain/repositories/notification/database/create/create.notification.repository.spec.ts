import type { IDatabaseAdapter } from '@src/account/domain/interfaces/database-adapter.interface';
import { CreateNotificationRepository } from './create.notification.repository';
import { NotificationEntity } from '@src/notification/domain/entities/notification/notification.entity';

describe('CreateNotificationRepository', () => {
  let repository: CreateNotificationRepository;
  let dbAdapter: jest.Mocked<IDatabaseAdapter>;

  beforeEach(() => {
    dbAdapter = {
      insert: jest.fn(),
    } as any;

    repository = new CreateNotificationRepository(dbAdapter);
  });

  it('should call db.insert with correct SQL and params', async () => {
    const notification = 
    new NotificationEntity({
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      message: 'Test notification message',
      status: 'pending'
    });
    const expectedResult = { id: '123' };
    dbAdapter.insert.mockResolvedValue(expectedResult);

    const result = await repository.create(notification);

    expect(dbAdapter.insert).toHaveBeenCalledWith(
      `INSERT INTO "notification" (uuid, content, status) VALUES ($1, $2, $3) RETURNING id`,
      {
        uuid: notification.uuid, 
        message: notification.message,
        status: notification.status
      }
    );
    expect(result).toBe(expectedResult);
  });
});