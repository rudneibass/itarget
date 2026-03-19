import { IsString, IsOptional, IsBoolean, MaxLength, MinLength } from 'class-validator';

export class CreateOrganizacaoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  nome: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
