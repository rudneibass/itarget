import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '@src/account/domain/services/user/create/create.user.service';
import { CreateUserServiceInputDto } from '@src/account/domain/services/user/create/create.user.service.input.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async handle(@Body() body: CreateUserServiceInputDto) {
    return await this.service.execute(body);
  }
}
