import { Inject, Injectable } from "@nestjs/common";
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";

@Injectable()
export class DeleteUserRepository {
  constructor(@Inject('DatabaseAdapterInterface') private readonly db: DatabaseAdapterInterface) {}

  async delete(id: string): Promise<{ affectedRows: number }>  {
    return await 
    this.db.delete(
      `DELETE FROM "user" WHERE id = $1`,
     [id]
    );
  }
}