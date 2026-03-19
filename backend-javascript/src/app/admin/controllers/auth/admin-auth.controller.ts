import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AdminAuthService } from '../../services/auth/admin-auth.service';

@Controller()
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Get()
  @Redirect('/landing', 302)
  redirectRoot() {
    return;
  }

  @Get('admin')
  @Redirect('/admin/home', 302)
  redirectAdminRoot() {
    return;
  }

  @Post('admin/auth/register')
  async register(
    @Body() payload: { nome: string; email: string; senha: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.adminAuthService.register(payload);

    res.cookie('school_admin_sid', session.sessaoId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 1000 * 60 * 60 * 8,
    });

    return { ok: true };
  }

  @Post('admin/auth/login')
  async login(
    @Body() payload: { email: string; senha: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.adminAuthService.login(payload);

    res.cookie('school_admin_sid', session.sessaoId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 1000 * 60 * 60 * 8,
    });

    return { ok: true };
  }

  @Get('admin/logout')
  logout(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const rawCookie = req.headers.cookie || '';
    const sidCookie = rawCookie
      .split(';')
      .map((chunk) => chunk.trim())
      .find((chunk) => chunk.startsWith('school_admin_sid='));

    if (sidCookie) {
      const sessaoId = sidCookie.split('=')[1];
      this.adminAuthService.logout(sessaoId);
    }

    res.clearCookie('school_admin_sid', { path: '/' });
    return res.redirect('/landing');
  }
}
