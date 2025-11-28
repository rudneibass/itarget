import { Organization } from '@src/account/domain/entities/organization/organization.entity';
import { OrganizationDto } from '@src/account/domain/entities/organization/organization.dto';

describe('User Entity', () => {
  it('should create a User from UserDto', () => {
    const dto = new OrganizationDto({ name: 'Fake Name', email: 'fake-email@example.com' });
    const user = new Organization(dto);

    expect(user.getName()).toBe('Fake Name');
    expect(user.getEmail()).toBe('fake-email@example.com');
  });

  it('should throw an error if the email is invalid', () => {
    const dto = new OrganizationDto({ name: 'Fake Name', email: 'invalid' });
    expect(() => new Organization(dto)).toThrow('Invalid email format');
  });
});
