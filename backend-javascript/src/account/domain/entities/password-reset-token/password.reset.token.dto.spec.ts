import { PasswordResetTokenDto } from './password.reset.token.dto';

describe('PasswordResetTokenDto', () => {
  it('should create a PasswordResetTokenDto with userId, tokenHash and expiresAt', () => {
    const dto = new PasswordResetTokenDto({ userId: 497, tokenHash: 'fake-token-hash', expiresAt: '2026-12-31' });
    expect(dto.userId).toBe(497);
    expect(dto.tokenHash).toBe('fake-token-hash');
    expect(dto.expiresAt).toBe('2026-12-31');
  });
});
