import { FindUserRepository } from '@src/account/domain/repositories/user/database/find.user.repository';
import type { IDatabaseAdapter } from '@src/account/domain/interfaces/database-adapter.interface';
import { User } from '@src/account/domain/entities/user/user.entity';

describe('FindUserRepository', () => {
  let repository: FindUserRepository;
  let mockDatabaseAdapter: jest.Mocked<IDatabaseAdapter>;

  beforeEach(() => {
    mockDatabaseAdapter = {
      insert: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
    };

    repository = new FindUserRepository(mockDatabaseAdapter);
  });

  describe('findById', () => {
    it('should return a user when found', async () => {
      const mockUserData = {
        id: '123',
        name: 'João da Silva',
        email: 'joao@email.com',
      };

      mockDatabaseAdapter.findById.mockResolvedValue(mockUserData);

      const result = await repository.findById('123');

      expect(mockDatabaseAdapter.findById).toHaveBeenCalledWith(
        'SELECT id, name, email FROM "user" WHERE id = $1',
        ['123']
      );

      expect(result).toBeInstanceOf(User);
      expect(result?.getName()).toBe('João da Silva');
      expect(result?.getEmail()).toBe('joao@email.com');
    });

    it('should return null when user not found', async () => {
      mockDatabaseAdapter.findById.mockResolvedValue(null);

      const result = await repository.findById('999');

      expect(mockDatabaseAdapter.findById).toHaveBeenCalledWith(
        'SELECT id, name, email FROM "user" WHERE id = $1',
        ['999']
      );

      expect(result).toBeNull();
    });

    it('should throw error when database adapter throws', async () => {
      const errorMessage = 'Database connection error';
      mockDatabaseAdapter.findById.mockRejectedValue(new Error(errorMessage));

      await expect(repository.findById('123')).rejects.toThrow(errorMessage);
    });
  });
}); 