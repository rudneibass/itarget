export class UserDto {
  name: string;
  email: string;

  constructor(data: { name: string; email: string }) {
    this.name = data.name;
    this.email = data.email;
  }
}