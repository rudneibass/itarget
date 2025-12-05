import { User } from '@src/account/domain/entities/user/user.entity';
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";

export class UpdateUserRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(user: User): Promise<number> {
    return await this.db.update(
      `UPDATE "user" 
        SET name = $1
        , email = $2
        , password_token = $3
        WHERE id = $4 
        RETURNING id`
      ,{
        name: user.getName(),
        email: user.getEmail(), 
        passwordToken: user.getPasswordHash(),
        id: user.getId()
      }
    );
  }
}