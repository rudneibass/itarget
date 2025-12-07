import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserServiceInputDto {
  
  @IsNotEmpty()
  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'abc123', description: 'Senha do usuário' })
  password: string;
}
