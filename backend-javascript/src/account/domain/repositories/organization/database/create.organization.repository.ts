import { Inject, Injectable } from "@nestjs/common";
import { Organization } from "@src/account/domain/entities/organization/organization.entity";
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";

@Injectable()
export class CreateOrganizationRepository {
  constructor(@Inject('DatabaseAdapterInterface') private readonly db: DatabaseAdapterInterface) {}

  async create(organization: Organization): Promise< {id: string }> {
    return await 
    this.db.insert(
      `INSERT INTO "organization" (name, email) VALUES ($1, $2) RETURNING id`,
      {name: organization.getName(), email: organization.getEmail(),}
    );
  }
}