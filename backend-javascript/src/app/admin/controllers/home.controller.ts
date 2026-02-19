import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class HomeController {
  @Get('home')
  @Render('pages/home/home')
  renderHome() {
    return {};
  }
}
