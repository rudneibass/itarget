import { DomainException } from "@src/account/infra/exceptions/domain.exception";

export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!this.validate(email)) {
      throw new DomainException(`Invalid email format: ${email}`)
    }
    this.value = email;
  }

  private validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.getValue();
  }
}
