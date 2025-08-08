import { Inject, Injectable } from "@nestjs/common";
import { User } from '@src/account/domain/entities/user/user.entity';
import type { IDatabaseAdapter } from '@src/account/domain/interfaces/database-adapter.interface';

@Injectable()
export class CreateUserRepository {
  constructor(@Inject('IDatabaseAdapter') private readonly db: IDatabaseAdapter) {}

  async create(user: User): Promise< {id: string }> {
    return await 
    this.db.insert(
      `INSERT INTO "user" (name, email) VALUES ($1, $2) RETURNING id`,
      {name: user.getName(), email: user.getEmail(),}
    );
  }
}