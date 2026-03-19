import { Module } from '@nestjs/common';
import { LandingController } from './controllers/landing.controller';

@Module({
  controllers: [LandingController],
})
export class LandingModule {}
