import { PasswordResetTokenDto } from "@src/account/domain/entities/password-reset-token/password.reset.token.dto";
import { PasswordResetToken } from "@src/account/domain/entities/password-reset-token/password.reset.token.entity";
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";
import { DomainException } from "@src/account/infra/exceptions/domain.exception";

export class GetByHashTokenRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(hashToken: string): Promise<PasswordResetToken | null> {
    try {
      const result = await this.db.select(
        `SELECT * FROM password_reset_token WHERE token_hash = $1`,
        { hashToken }
      );

      const passwordResetToken = result?.rows[0] || [];

      if (passwordResetToken.length === 0) {
        return null;
      }

      return new PasswordResetToken(
        new PasswordResetTokenDto({
          id: passwordResetToken['id'],
          userId: passwordResetToken['user_id'],
          hashToken: passwordResetToken['token_hash'],
          expiresAt: passwordResetToken['expires_at'],
          used: passwordResetToken['used']
        })
      )

    } catch (error) {
      throw new DomainException(
        `Failed to retrieve passwordResetToken. Error message: ${error.message}`,
        500
      );
    }
  }

}