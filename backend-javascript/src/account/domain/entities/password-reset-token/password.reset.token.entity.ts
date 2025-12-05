import { DateTime } from '../../value-objects/date-time/data.time.vo';
import { PasswordResetTokenDto } from './password.reset.token.dto';

export class PasswordResetToken {
  private readonly id?: number | null;
  private readonly userId: number;
  private readonly hashToken: string;
  private readonly expiresAt: DateTime;
  private used?: boolean;

  constructor(dto: PasswordResetTokenDto) {
    this.id = dto.id || null;
    this.used = dto.used || false;
    this.userId = dto.userId;
    this.hashToken =  dto.hashToken;
    this.expiresAt = new DateTime(dto.expiresAt);
  }

  getId(): number | null {
    return this.id || null;
  }
  
  getUserId(): number {
    return this.userId;
  }

  getHashToken(): string {
    return this.hashToken;
  }

  getExpiresAt(): string {
    return this.expiresAt.toTimestamp();
  }

  getUsed(): boolean {
    return this.used || false
  }

  updateUsed(used: boolean){
    this.used = used
  }

}
