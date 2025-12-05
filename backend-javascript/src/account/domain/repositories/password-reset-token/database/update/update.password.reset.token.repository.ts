import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import { User } from '@src/account/domain/entities/user/user.entity';
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";

export class UpdatePasswordResetTokenRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(passwordResetToken: PasswordResetToken): Promise<number> {
    return await this.db.update(
      `UPDATE password_reset_token 
        SET used = $1
        WHERE id = $2 
        RETURNING id`
      ,{
        used: passwordResetToken.getUsed(),
        id: passwordResetToken.getId()
      }
    );
  }
}