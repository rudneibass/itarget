import { UserDto } from '@src/account/domain/entities/user/user.dto';

describe('UserDto', () => {
  it('should create a dto with name and email', () => {
    const dto = new UserDto({ name: 'João', email: 'joao@example.com' });
    expect(dto.name).toBe('João');
    expect(dto.email).toBe('joao@example.com');
  });
});
