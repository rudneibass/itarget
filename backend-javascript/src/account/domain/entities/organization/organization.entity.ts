import { Email } from '@src/account/domain/value-objects/email/email.vo';
import { OrganizationDto } from '@src/account/domain/entities/organization/organization.dto';

export class Organization {
  private readonly name: string;
  private readonly email: Email;

  constructor(dto: OrganizationDto) {
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
