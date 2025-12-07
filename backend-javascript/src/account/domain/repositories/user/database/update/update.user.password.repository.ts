import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import { User } from '@src/account/domain/entities/user/user.entity';
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";

export class UpdateUserPasswordRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(user: User, passwordResetToken: PasswordResetToken): Promise<number | null> {
    this.db.beginTransaction()
    try {
      const userId =
      await this.db.update(
        `UPDATE "user" SET password_hash = $1 WHERE id = $2 RETURNING id`,
        { passwordToken: user.getPasswordHash(), id: user.getId() }
      )

      await this.db.update(
        `UPDATE password_reset_token SET used = $1 WHERE id = $2 RETURNING id`,
        { used: passwordResetToken.getHashToken(), id: passwordResetToken.getId()}
      )
      this.db.commit()
      return userId
    } catch (error){
      this.db.rollback()
      return null
    }
  }
}