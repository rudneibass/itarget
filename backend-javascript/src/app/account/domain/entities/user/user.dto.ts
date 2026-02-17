export class UserDto {
  id?: number | null;
  name: string;
  email: string;
  passwordHash?: string;

  constructor(data: {id?: number, name: string; email: string, passwordHash?: string }) {
    this.id = data.id || null;
    this.name = data.name;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
  }
}