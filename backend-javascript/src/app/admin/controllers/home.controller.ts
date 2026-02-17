import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

@Controller('admin')
export class HomeController {
  @Get('home')
  renderHome(@Res() response: Response) {
    return response.sendFile(
      join(
        process.cwd(),
        'src',
        'app',
        'admin',
        'templates',
        'pages',
        'home',
        'home.html',
      ),
    );
  }
}
