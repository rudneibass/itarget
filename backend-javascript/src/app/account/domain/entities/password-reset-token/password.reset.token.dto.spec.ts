import { PasswordResetTokenDto } from './password.reset.token.dto';

describe('PasswordResetTokenDto', () => {
  it('should create a PasswordResetTokenDto with userId, hashToken and expiresAt', () => {
    const dto = new PasswordResetTokenDto({ userId: 497, hashToken: 'fake-token-hash', expiresAt: '2026-12-31' });
    expect(dto.userId).toBe(497);
    expect(dto.hashToken).toBe('fake-token-hash');
    expect(dto.expiresAt).toBe('2026-12-31');
  });
});
