import { IsDateString, IsOptional, IsString } from 'class-validator';

export class ListVideoQueryDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsDateString()
  data?: string;
}
