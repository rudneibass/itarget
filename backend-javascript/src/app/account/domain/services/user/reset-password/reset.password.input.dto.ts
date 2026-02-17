import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ResetPasswordInputDto {
  
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;

  @IsNotEmpty()
  @ApiProperty()
  token: string;
}
