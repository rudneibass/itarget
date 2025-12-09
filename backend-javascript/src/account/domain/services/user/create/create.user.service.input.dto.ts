import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserServiceInputDto {
  
  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({ example: 'abc123', description: 'Senha do usuário' })
  @IsNotEmpty()
  password: string;
}
