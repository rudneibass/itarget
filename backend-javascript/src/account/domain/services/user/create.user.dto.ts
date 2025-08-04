export class CreateUserDto {
  name: string;
  email: string;

  constructor(data: { name: string; email: string }) {
    this.name = data.name;
    this.email = data.email;
  }
}
