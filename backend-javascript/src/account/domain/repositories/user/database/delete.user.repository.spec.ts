import { DeleteUserRepository } from '@src/account/domain/repositories/user/database/delete.user.repository';
import type { IDatabaseAdapter } from '@src/account/domain/interfaces/database-adapter.interface';

describe('DeleteUserRepository', () => {
  let repository: DeleteUserRepository;
  let dbAdapter: jest.Mocked<IDatabaseAdapter>;

  beforeEach(() => {
    dbAdapter = {
      delete: jest.fn(),
    } as any;

    repository = new DeleteUserRepository(dbAdapter);
  });

  it('should call db.delete with correct SQL and params', async () => {
    const userId = '123';
    const expectedResult = { affectedRows: 1 };
    dbAdapter.delete.mockResolvedValue(expectedResult);

    const result = await repository.delete(userId);

    expect(dbAdapter.delete).toHaveBeenCalledWith(
      `DELETE FROM "user" WHERE id = $1`,
      [userId]
    );
    expect(result).toBe(expectedResult);
  });
});