import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePasswordResetTokenInputDto {
  @IsNotEmpty()
  @ApiProperty({description: 'Email do usuário' })
  email: string;
}
