import { OrganizationDto } from '@src/account/domain/entities/organization/organization.dto';

describe('OrganizationDto', () => {
  it('should create a dto with name and email', () => {
    const dto = new OrganizationDto({ name: 'ORG Name', email: 'org-name@example.com' });
    expect(dto.name).toBe('ORG Name');
    expect(dto.email).toBe('org-name@example.com');
  });
});
