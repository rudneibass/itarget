import { ApiProperty } from "@nestjs/swagger";

export class CreateOrganizationServiceInputDto {
  @ApiProperty({ example: 'ORG Name', description: 'Nome da organização' })
  name: string;

  @ApiProperty({ example: 'org-email@email.com', description: 'Email da organização' })
  email: string;

  constructor(data: { name: string; email: string }) {
    this.name = data.name;
    this.email = data.email;
  }
}
