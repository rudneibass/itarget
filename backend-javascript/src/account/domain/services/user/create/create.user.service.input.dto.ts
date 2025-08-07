import { ApiProperty } from "@nestjs/swagger";

export class CreateUserServiceInputDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  email: string;

  constructor(data: { name: string; email: string }) {
    this.name = data.name;
    this.email = data.email;
  }
}
