import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeController } from './controllers/home/home.controller';
import { VideoController } from './controllers/video/video.controller';
import { Video } from './models/video/video.entity';
import { VideoService } from './services/video/video.service';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [HomeController, VideoController],
  providers: [VideoService],
})
export class AdminModule {}
