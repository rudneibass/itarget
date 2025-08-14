import { FindUserService } from '@src/account/domain/services/user/find/find.user.service';
import { FindUserRepository } from '@src/account/domain/repositories/user/database/find.user.repository';
import { FindUserServiceInputDto } from '@src/account/domain/services/user/find/find.user.service.input.dto';
import { User } from '@src/account/domain/entities/user/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('FindUserService', () => {
  let service: FindUserService;
  let mockRepository: jest.Mocked<FindUserRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
    } as any;

    service = new FindUserService(mockRepository);
  });

  describe('execute', () => {
    it('should return a user when found', async () => {
      const mockUser = new User({
        name: 'João da Silva',
        email: 'joao@email.com',
      });

      mockRepository.findById.mockResolvedValue(mockUser);

      const inputDto = new FindUserServiceInputDto({ id: '123' });
      const result = await service.execute(inputDto);

      expect(mockRepository.findById).toHaveBeenCalledWith('123');
      expect(result).toBe(mockUser);
      expect(result.getName()).toBe('João da Silva');
      expect(result.getEmail()).toBe('joao@email.com');
    });

    it('should throw NotFoundException when user not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      const inputDto = new FindUserServiceInputDto({ id: '999' });

      await expect(service.execute(inputDto)).rejects.toThrow(NotFoundException);
      await expect(service.execute(inputDto)).rejects.toThrow('User with ID 999 not found');

      expect(mockRepository.findById).toHaveBeenCalledWith('999');
    });

    it('should throw error when repository throws', async () => {
      const errorMessage = 'Database error';
      mockRepository.findById.mockRejectedValue(new Error(errorMessage));

      const inputDto = new FindUserServiceInputDto({ id: '123' });

      await expect(service.execute(inputDto)).rejects.toThrow(errorMessage);
    });
  });
}); 