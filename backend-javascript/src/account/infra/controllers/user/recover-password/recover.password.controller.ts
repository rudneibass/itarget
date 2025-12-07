import { Controller, Get, Query, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('user')
export class RecoverPasswordController {

  @Get('recover-password')
  @Render('recover-password')
  showResetPage(@Query('token') token: string) {
    return { token };
  }
}
