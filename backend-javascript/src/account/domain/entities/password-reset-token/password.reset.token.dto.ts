export class PasswordResetTokenDto {
  id?: number | null;
  userId: number;
  tokenHash: string;
  expiresAt: string;
  used: boolean | null;

  constructor(data: { id?: number,  used?: boolean, userId: number; tokenHash: string, expiresAt: string }) {
    this.id = data.id || null;
    this.used = data.used || null;
    this.userId = data.userId;
    this.tokenHash =  data.tokenHash;
    this.expiresAt = data.expiresAt;
  }
}