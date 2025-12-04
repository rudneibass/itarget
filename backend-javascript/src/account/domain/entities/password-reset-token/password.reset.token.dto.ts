export class PasswordResetTokenDto {
  id?: number | null;
  userId: number;
  hashToken: string;
  expiresAt: string;
  used: boolean | null;

  constructor(data: { id?: number,  used?: boolean, userId: number; hashToken: string, expiresAt: string }) {
    this.id = data.id || null;
    this.used = data.used || null;
    this.userId = data.userId;
    this.hashToken =  data.hashToken;
    this.expiresAt = data.expiresAt;
  }
}