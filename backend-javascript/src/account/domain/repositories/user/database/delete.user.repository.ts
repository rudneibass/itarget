import { Inject, Injectable } from "@nestjs/common";
import type { IDatabaseAdapter } from '@src/account/domain/interfaces/database-adapter.interface';

@Injectable()
export class DeleteUserRepository {
  constructor(@Inject('IDatabaseAdapter') private readonly db: IDatabaseAdapter) {}

  async delete(id: string): Promise<{ affectedRows: number }>  {
    return await 
    this.db.delete(
      `DELETE FROM "user" WHERE id = $1`,
     [id]
    );
  }
}