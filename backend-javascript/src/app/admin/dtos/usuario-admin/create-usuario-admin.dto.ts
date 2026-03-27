import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioAdminDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  nome: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  senha: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
