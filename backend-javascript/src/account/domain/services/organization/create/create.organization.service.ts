import { Injectable } from '@nestjs/common';
import { CreateOrganizationRepository } from '@src/account/domain/repositories/organization/database/create.organization.repository';
import { CreateOrganizationServiceInputDto } from './create.organization.service.input.dto';
import { OrganizationDto } from '@src/account/domain/entities/organization/organization.dto';
import { Organization } from '@src/account/domain/entities/organization/organization.entity';

@Injectable()
export class CreateOrganizationService {
  constructor(private readonly repository: CreateOrganizationRepository) {}

  async execute(createOrganizationDto: CreateOrganizationServiceInputDto){
    const organizationDto = new OrganizationDto({
      name: createOrganizationDto.name,
      email: createOrganizationDto.email,
    }); 

    const organization = new Organization(organizationDto);
    const result = await this.repository.create(organization);
    return result;
  }
}
