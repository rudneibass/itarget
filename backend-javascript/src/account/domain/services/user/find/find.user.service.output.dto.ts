import { ApiProperty } from "@nestjs/swagger";

export class FindUserServiceOutputDto {
  @ApiProperty({ 
    example: '123', 
    description: 'ID do usuário a ser buscado' 
  })
  name: string;
  email: string;

  constructor({ name, email }: { name:string, email: string }) {
    this.name = name;
    this.email = email;
  }
} 