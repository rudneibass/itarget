import { IsOptional, IsString } from 'class-validator';

export class ListOrganizacaoQueryDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  slug?: string;
}
