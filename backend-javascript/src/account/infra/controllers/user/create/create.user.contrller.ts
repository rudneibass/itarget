import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserService } from '../../../../domain/services/user/create.user.service';
import { CreateUserDto } from '../../../../domain/services/user/create.user.dto';

@Controller('user')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post('create')
  async handle(@Body() body: CreateUserDto) {
    return await this.service.execute(body);
  }
}
