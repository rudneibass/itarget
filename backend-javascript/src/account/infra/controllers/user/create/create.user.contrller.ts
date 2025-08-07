import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../../../../domain/services/user/create/create.user.service';
import { CreateUserServiceInputDto } from '../../../../domain/services/user/create/create.user.service.input.dto';

@Controller('user')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post('create')
  async handle(@Body() body: CreateUserServiceInputDto) {
    return await this.service.execute(body);
  }
}
