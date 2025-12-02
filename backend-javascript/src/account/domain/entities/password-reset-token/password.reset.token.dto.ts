export class PasswordResetTokenDto {
  userId: number;
  tokenHash: string;
  expiresAt: string;

  constructor(data: { userId: number; tokenHash: string, expiresAt: string }) {
    this.userId = data.userId;
    this.tokenHash =  data.tokenHash;
    this.expiresAt = data.expiresAt;
  }
}