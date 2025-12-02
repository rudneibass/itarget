import { DateTime } from '../../value-objects/date-time/data.time.vo';
import { PasswordResetTokenDto } from './password.reset.token.dto';

export class PasswordResetToken {
  private readonly id?: number | null;
  private readonly userId: number;
  private readonly tokenHash: string;
  private readonly expiresAt: DateTime;
  private used?: boolean;

  constructor(dto: PasswordResetTokenDto) {
    this.id = dto.id || null;
    this.used = dto.used || false;
    this.userId = dto.userId;
    this.tokenHash =  dto.tokenHash;
    this.expiresAt = new DateTime(dto.expiresAt);
  }

  getId(): number | null {
    return this.id || null;
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

  updateUsed(used: boolean){
    this.used = used
  }
}
