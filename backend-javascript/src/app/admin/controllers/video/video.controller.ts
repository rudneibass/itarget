import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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

  @Get('form')
  @Render('pages/video/form')
  renderForm() {
    return {};
  }

  @Get('form/uuid/:uuid')
  @Render('pages/video/form')
  renderFormByUuid(@Param('uuid') uuid: string) {
    return { uuid };
  }

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    try {
      return await this.videoService.create(createVideoDto);
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar vídeo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('all')
  async findAll(@Query() query: ListVideoQueryDto) {
    try {
      const videos = await this.videoService.findAll(query);
      return { data: videos };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao listar vídeos',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string) {
    try {
      const video = await this.videoService.get(uuid);
      return { data: video };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao buscar vídeo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateVideoDto: UpdateVideoDto) {
    try {
      const updatedVideo = await this.videoService.update(uuid, updateVideoDto);
      return { data: updatedVideo };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao atualizar vídeo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.videoService.remove(uuid);
    return { message: 'Video removido com sucesso' };
  }
}
