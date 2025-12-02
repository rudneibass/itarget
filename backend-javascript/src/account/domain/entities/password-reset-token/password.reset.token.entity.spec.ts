import { PasswordResetToken } from './password.reset.token.entity';
import { PasswordResetTokenDto } from './password.reset.token.dto';
import { DateTime } from '../../value-objects/date-time/data.time.vo';

describe('PasswordResetToken', () => {

  // -------------------------------------------------------
  // 1. Criação válida
  // -------------------------------------------------------
  it('deve criar uma instância válida de PasswordResetToken', () => {
    const dto: PasswordResetTokenDto = {
      userId: 10,
      tokenHash: 'abcd1234hash',
      expiresAt: '2025-12-01 10:30:00',
    };

    const token = new PasswordResetToken(dto);

    expect(token.getUserId()).toBe(10);
    expect(token.getTokenHash()).toBe('abcd1234hash');
    expect(token.getExpiresAt()).toBe('2025-12-01 10:30:00');
  });

  // -------------------------------------------------------
  // 2. Deve aceitar um Date como expiresAt
  // -------------------------------------------------------
  it('deve aceitar um objeto Date como expiresAt', () => {
    const date = new Date('2025-12-01T10:30:00Z');

    const dto: PasswordResetTokenDto = {
      userId: 5,
      tokenHash: 'hash5678',
      expiresAt: date,
    };

    const token = new PasswordResetToken(dto);

    expect(token.getExpiresAt()).toBe('2025-12-01 10:30:00');
  });

  // -------------------------------------------------------
  // 3. Erro caso expiresAt seja inválido
  // -------------------------------------------------------
  it('deve lançar erro se expiresAt for inválido', () => {
    const dto: PasswordResetTokenDto = {
      userId: 1,
      tokenHash: 'invalidhash',
      expiresAt: 'data-invalida', // inválido
    };

    expect(() => new PasswordResetToken(dto)).toThrowError();
  });

  // -------------------------------------------------------
  // 4. Integração com DateTime VO
  // -------------------------------------------------------
  it('deve criar expiresAt como uma instância de DateTime', () => {
    const dto: PasswordResetTokenDto = {
      userId: 9,
      tokenHash: 'XYZ',
      expiresAt: '2025-12-01 10:30:00',
    };

    const token = new PasswordResetToken(dto);

    // @ts-ignore (para testar internamente)
    expect(token['expiresAt']).toBeInstanceOf(DateTime);
  });

  // -------------------------------------------------------
  // 5. Testar precisão da data (UTC)
  // -------------------------------------------------------
  it('deve converter corretamente para timestamp UTC', () => {
    const dto: PasswordResetTokenDto = {
      userId: 2,
      tokenHash: 'precisao123',
      expiresAt: '2025-01-15 08:05:30',
    };

    const token = new PasswordResetToken(dto);

    expect(token.getExpiresAt()).toBe('2025-01-15 08:05:30');
  });

  // -------------------------------------------------------
  // 6. Garantir imutabilidade (exposição segura)
  // -------------------------------------------------------
  it('getExpiresAt deve retornar string imutável', () => {
    const dto: PasswordResetTokenDto = {
      userId: 3,
      tokenHash: 'immutable',
      expiresAt: '2025-12-01 10:30:00',
    };

    const token = new PasswordResetToken(dto);

    const expiresAt = token.getExpiresAt();

    expect(expiresAt).toBe('2025-12-01 10:30:00');

    // Tentativa de mutar a string
    const mutated = expiresAt.replace('2025', '1999');

    expect(mutated).toBe('1999-12-01 10:30:00');
    expect(token.getExpiresAt()).toBe('2025-12-01 10:30:00'); // permanece igual
  });
});
