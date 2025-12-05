import { User } from '@src/account/domain/entities/user/user.entity';
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";

export class CreateUserRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(user: User): Promise<number> {
    return await 
    this.db.insert(
      `INSERT INTO "user" (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id`,
      {name: user.getName(), email: user.getEmail(), password_hash: user.getPasswordHash()}
    );
  }
}