import { ApiProperty } from "@nestjs/swagger";

export class CreatePasswordResetTokenInputDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  userId?: number | null | undefined;

  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  email: string;

  constructor(data: { userId: number; email: string }) {
    this.userId = data.userId;
    this.email = data.email;
  }
}
