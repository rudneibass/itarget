import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserService } from '../../../../domain/services/user/create.user.service';
import { CreateUserDto } from '../../../../domain/services/user/create.user.dto';

@Controller('user')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post('create')
  async handle(@Body() body: CreateUserDto) {
    try {
      return await this.service.execute(body);
    } catch (error) {
      throw new HttpException(
        { 
          message: error.message || 'Erro ao criar usuário',
          error: error.stack
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
