import { Email } from '../../value-objects/email/email.vo';
import { UserDto } from './user.dto';

export class User {
  private readonly name: string;
  private readonly email: Email;

  constructor(dto: UserDto) {
    this.name = dto.name;
    this.email = new Email(dto.email);
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email.getValue();
  }
}
