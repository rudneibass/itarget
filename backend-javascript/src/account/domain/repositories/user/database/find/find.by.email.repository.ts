import { UserDto } from "@src/account/domain/entities/user/user.dto";
import { User } from '@src/account/domain/entities/user/user.entity';
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";
import { DomainException } from "@src/account/infra/exceptions/domain.exception";

export class FindByEmailRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(email: string): Promise<User[]> {
    try {
      const result = await this.db.select(
        `SELECT * FROM "user" WHERE email = $1`,
        { email }
      );

      const userRows = result?.rows || [];

      if (userRows.length === 0) {
        return [];
      }

      return userRows.map(row => 
        new User(
          new UserDto({
            id: row['id'],
            name: row['name'],
            email: row['email']
          })
        )
      );

    } catch (error) {
      throw new DomainException(
        `Failed to retrieve users by email "${email}". Error message: ${error.message}`,
        500
      );
    }
  }

}