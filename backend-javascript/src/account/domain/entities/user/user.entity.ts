import { Email } from '@src/account/domain/value-objects/email/email.vo';
import { UserDto } from '@src/account/domain/entities/user/user.dto';

export class User {
  private readonly name: string;
  private readonly email: Email;
  private readonly passwordHash?: string;

  constructor(dto: UserDto) {
    this.name = dto.name;
    this.email = new Email(dto.email);
    this.passwordHash = dto.passwordHash;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getPasswordHash(): string | undefined {
    return this.passwordHash;
  }
}
