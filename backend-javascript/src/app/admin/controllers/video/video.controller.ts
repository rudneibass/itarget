import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { CreateVideoDto } from '../../dtos/video/create-video.dto';
import { ListVideoQueryDto } from '../../dtos/video/list-video-query.dto';
import { UpdateVideoDto } from '../../dtos/video/update-video.dto';
import { VideoService } from '../../services/video/video.service';

@Controller('admin/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('list')
  @Render('pages/video/list')
  renderList() {
    return {};
  }

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Get('all')
  findAll(@Query() query: ListVideoQueryDto) {
    return this.videoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    return this.videoService.update(id, updateVideoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.videoService.remove(id);
    return { message: 'Video removido com sucesso' };
  }
}
