import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import type { DatabaseAdapterInterface } from "@src/account/domain/interfaces/database.adapter.interface";

export class CreateRepository {
  constructor(private readonly db: DatabaseAdapterInterface) {}

  async handle(passwordResetToken: PasswordResetToken): Promise< {id: string }> {
    return await 
    this.db.insert(
      `INSERT INTO "password_reset_token" (user_id, token_hash, expires_at) VALUES ($1, $2, $3) RETURNING id`,
      {
        userId: passwordResetToken.getUserId(), 
        tokenHash: passwordResetToken.getTokenHash(), 
        expiresAt: passwordResetToken.getExpiresAt()
      }
    );
  }
}