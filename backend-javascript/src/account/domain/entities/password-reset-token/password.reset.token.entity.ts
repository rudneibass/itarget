import { DateTime } from '../../value-objects/date-time/data.time.vo';
import { PasswordResetTokenDto } from './password.reset.token.dto';

export class PasswordResetToken {
  private readonly userId: number;
  private readonly tokenHash: string;
  private readonly expiresAt: DateTime;

  constructor(dto: PasswordResetTokenDto) {
    this.userId = dto.userId;
    this.tokenHash =  dto.tokenHash;
    this.expiresAt = new DateTime(dto.expiresAt);
  }

  getUserId(): number {
    return this.userId;
  }

  getTokenHash(): string {
    return this.tokenHash;
  }

  getExpiresAt(): string {
    return this.expiresAt.toTimestamp();
  }
}
