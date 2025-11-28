import { Email } from '@src/account/domain/value-objects/email/email.vo';

describe('Email Value Object', () => {
  it('should create a valid email', () => {
    const email = new Email('valid@example.com');
    expect(email.getValue()).toBe('valid@example.com');
  });

  it('should throw an error for an invalid email', () => {
    expect(() => new Email('invalid-email')).toThrow('Invalid email format');
  });

  it('should compare two equal emails correctly', () => {
    const email1 = new Email('test@example.com');
    const email2 = new Email('test@example.com');
    expect(email1.equals(email2)).toBe(true);
  });

  it('should compare two different emails as not equal', () => {
    const email1 = new Email('a@example.com');
    const email2 = new Email('b@example.com');
    expect(email1.equals(email2)).toBe(false);
  });
});
