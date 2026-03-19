import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUsuarioAdminDto } from './create-usuario-admin.dto';

export class UpdateUsuarioAdminDto extends PartialType(CreateUsuarioAdminDto) {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  senha?: string;
}
