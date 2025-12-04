import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller('user')
export class RecoverPasswordController {

  @Get('recover-password')
  @Render('recover-password')
  showResetPage(@Query('token') token: string) {
    return { token };
  }
}
