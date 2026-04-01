import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class LandingController {
  @Get('landing')
  @Render('pages/landing/home')
  renderLanding() {
    return {};
  }

  @Get('landing/modulos')
  @Render('pages/landing/modulos')
  renderLandingModulos() {
    return {};
  }

  @Get('landing/reuniao')
  @Render('pages/landing/reuniao')
  renderLandingReuniao() {
    return {};
  }

  @Get('landing/onepage')
  @Render('pages/landing/onepage')
  renderLandingOnePage() {
    return {};
  }
}
