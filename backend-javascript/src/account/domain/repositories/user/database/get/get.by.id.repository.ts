import { UserDto } from "@src/account/domain/entities/user/user.dto";
import { User } from '@src/account/domain/entities/user/user.entity';
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";
import { DomainException } from "@src/account/infra/exceptions/domain.exception";

export class GetByIdRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(id: number): Promise<User | null> {
    try{  
      const result = await this.db.select(
        `SELECT * FROM  "user" WHERE id = $1`,
        {id: id}
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
      throw new DomainException(`Failed to retrieve user by id "${id}". Error message: ${error.message}`);
    }  
  }
}