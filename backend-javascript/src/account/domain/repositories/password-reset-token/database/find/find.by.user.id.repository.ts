import { PasswordResetTokenDto } from "@src/account/domain/entities/password-reset-token/password.reset.token.dto";
import { PasswordResetToken } from "@src/account/domain/entities/password-reset-token/password.reset.token.entity";
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";
import { DomainException } from "@src/account/infra/exceptions/domain.exception";

export class FindByUserIdRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(userId: number): Promise<PasswordResetToken[]> {
    try {
      const result = await this.db.select(
        `SELECT * FROM password_reset_token WHERE user_id = $1`,
        { userId }
      );

      const userRows = result?.rows || [];

      if (userRows.length === 0) {
        return [];
      }

      return userRows.map(row => 
        new PasswordResetToken(
          new PasswordResetTokenDto({
            id: row['id'],
            userId: row['user_id'],
            tokenHash: row['token_hash'],
            expiresAt: row['expires_at'],
            used: row['used']
          })
        )
      );

    } catch (error) {
      throw new DomainException(
        `Failed to retrieve passwordResetToken by userId "${userId}". Error message: ${error.message}`,
        500
      );
    }
  }

}