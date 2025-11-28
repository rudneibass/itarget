export class UserDto {
  name: string;
  email: string;
  passwordHash?: string;

  constructor(data: { name: string; email: string, passwordHash?: string }) {
    this.name = data.name;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
  }
}