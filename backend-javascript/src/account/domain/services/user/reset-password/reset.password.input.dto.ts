import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordInputDto {
  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  email: string;

  @ApiProperty({ example: 'abc123', description: 'Senha do usuário' })
  newPassword: string;

  @ApiProperty()
  token: string;

  constructor(data: { email: string, newPassword: string }) {
    this.email = data.email;
    this.newPassword = data.newPassword;
  }
}
