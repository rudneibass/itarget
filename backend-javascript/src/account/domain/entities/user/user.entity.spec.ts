import { User } from '@src/account/domain/entities/user/user.entity';
import { UserDto } from '@src/account/domain/entities/user/user.dto';

describe('User Entity', () => {
  it('should create a User from UserDto', () => {
    const dto = new UserDto({ name: 'Ana', email: 'ana@example.com' });
    const user = new User(dto);

    expect(user.getName()).toBe('Ana');
    expect(user.getEmail()).toBe('ana@example.com');
  });

  it('should throw an error if the email is invalid', () => {
    const dto = new UserDto({ name: 'Ana', email: 'invalid' });
    expect(() => new User(dto)).toThrow('Invalid email format');
  });
});
