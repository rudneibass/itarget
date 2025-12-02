import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import { User } from '@src/account/domain/entities/user/user.entity';
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";

export class UpdatePasswordResetTokenRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(passwordResetToken: PasswordResetToken): Promise< {id: string }> {
    return await this.db.update(
      `UPDATE "user" 
        SET used = $1
        WHERE id = $2 
        RETURNING id`
      ,{
        used: passwordResetToken.getUserId(),
        id: passwordResetToken.getId()
      }
    );
  }
}