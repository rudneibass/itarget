import { UserDto } from "@src/account/domain/entities/user/user.dto";
import { User } from '@src/account/domain/entities/user/user.entity';
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";
import { DomainException } from "@src/common/exception/domain.exception";

export class GetByEmailRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(email: string): Promise<User | null> {
    try {
      const result = await this.db.select(
        `SELECT * FROM  "user" WHERE email = $1`,
        {email: email}
      );
      const userRows = result?.rows || []
      
      if (userRows.length === 0) {
        return null;
      }

      return new User(
        new UserDto({
          name: userRows[0]['name'],
          email: userRows[0]['email']
        })
      )
    } catch (error) {
      throw new DomainException(`Failed to retrieve user by email "${email}". Error message:  ${error.message}`, 500);
    }
  }
}