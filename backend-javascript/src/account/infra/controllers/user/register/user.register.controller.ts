import { Controller, Get, Post } from '@nestjs/common';


@Controller()
export class UserRegisterController {
  constructor() {}

  @Get('user/register')
  handle(): string {
    return 'Register user controller!'
  }
}
