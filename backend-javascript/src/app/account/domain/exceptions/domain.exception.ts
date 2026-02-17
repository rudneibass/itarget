export class DomainException extends Error {
  readonly layer = 'domain';
  readonly statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'DomainException';
    this.statusCode = statusCode ?? 422;
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}