import { CreateUserRepository } from '@src/account/domain/repositories/user/database/create/create.user.repository';
import type { DatabaseAdapterInterface } from '@src/account/domain/interfaces/database.adapter.interface';
import { User } from '@src/account/domain/entities/user/user.entity';
import { UserDto } from '@src/account/domain/entities/user/user.dto';

describe('CreateUserRepository', () => {
  let createUserrepository: CreateUserRepository;
  let dbAdapter: jest.Mocked<DatabaseAdapterInterface>;

  beforeEach(() => {
    dbAdapter = {
      insert: jest.fn(),
    } as any;

    createUserrepository = new CreateUserRepository(dbAdapter);
  });

  it('should call db.insert with correct SQL and params', async () => {
    const user = 
    new User(
      new UserDto({
          name: 'João',
          email:'joao@email.com',
        })
    );
    const expectedResult = { id: '123' };
    dbAdapter.insert.mockResolvedValue(expectedResult);

    const result = await createUserrepository.handle(user);

    expect(dbAdapter.insert).toHaveBeenCalledWith(
      `INSERT INTO "user" (name, email) VALUES ($1, $2) RETURNING id`,
      { name: user.getName(), email: user.getEmail() }
    );
    expect(result).toBe(expectedResult);
  });
});