import type { IDatabaseAdapter } from '@src/account/domain/interfaces/database-adapter.interface';
import { CreateOrganizationRepository } from './create.organization.repository';
import { Organization } from '@src/account/domain/entities/organization/organization.entity';
import { OrganizationDto } from '@src/account/domain/entities/organization/organization.dto';

describe('CreateUserRepository', () => {
  let repository: CreateOrganizationRepository;
  let dbAdapter: jest.Mocked<IDatabaseAdapter>;

  beforeEach(() => {
    dbAdapter = {
      insert: jest.fn(),
    } as any;

    repository = new CreateOrganizationRepository(dbAdapter);
  });

  it('should call db.insert with correct SQL and params', async () => {
    const organization = 
    new Organization(
      new OrganizationDto({
          name: 'João',
          email:'joao@email.com',
        })
    );
    const expectedResult = { id: '123' };
    dbAdapter.insert.mockResolvedValue(expectedResult);

    const result = await repository.create(organization);

    expect(dbAdapter.insert).toHaveBeenCalledWith(
      `INSERT INTO "organization" (name, email) VALUES ($1, $2) RETURNING id`,
      { name: organization.getName(), email: organization.getEmail() }
    );
    expect(result).toBe(expectedResult);
  });
});