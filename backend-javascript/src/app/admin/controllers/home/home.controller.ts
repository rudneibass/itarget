import { Controller, Get, Render, Req } from '@nestjs/common';

@Controller('admin')
export class HomeController {
  @Get('home')
  @Render('pages/home/home')
  renderHome(@Req() req: any) {
    return { usuarioUuid: req.adminSession?.usuario?.uuid || null };
  }
}
