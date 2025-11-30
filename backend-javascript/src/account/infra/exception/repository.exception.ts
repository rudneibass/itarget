export class RepositoryException extends Error {
  readonly layer = 'repository';

  constructor(message: string) {
    super(message);
    this.name = 'RepositoryException';
    Object.setPrototypeOf(this, RepositoryException.prototype);
  }
}