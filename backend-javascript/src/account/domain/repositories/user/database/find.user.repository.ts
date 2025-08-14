import { Inject, Injectable } from "@nestjs/common";
import { User } from '@src/account/domain/entities/user/user.entity';
import type { IDatabaseAdapter } from '@src/account/domain/interfaces/database-adapter.interface';

@Injectable()
export class FindUserRepository {
  constructor(@Inject('IDatabaseAdapter') private readonly db: IDatabaseAdapter) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db.findById(
      `SELECT id, name, email FROM "user" WHERE id = $1`,
      [id]
    );

    if (!result) {
      return null;
    }

    const userDto = {
      name: result.name,
      email: result.email,
    };

    return new User(userDto);
  }

} 