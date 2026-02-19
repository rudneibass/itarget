import { IsDateString, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateVideoDto {
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  criadoPor?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  alteradoPor?: string;

  @IsOptional()
  @IsDateString()
  data?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  titulo?: string;

  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  imagem?: string;
}
