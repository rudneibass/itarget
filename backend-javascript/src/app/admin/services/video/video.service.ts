import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVideoDto } from '../../dtos/video/create-video.dto';
import { ListVideoQueryDto } from '../../dtos/video/list-video-query.dto';
import { UpdateVideoDto } from '../../dtos/video/update-video.dto';
import { Video } from '../../models/video/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const video = this.videoRepository.create(createVideoDto);
    return this.videoRepository.save(video);
  }

  async findAll(query: ListVideoQueryDto): Promise<Video[]> {
    const queryBuilder = this.videoRepository
      .createQueryBuilder('video')
      .orderBy('video.id', 'DESC');

    if (query.id) {
      queryBuilder.andWhere('video.id = :id', { id: Number(query.id) || 0 });
    }

    if (query.titulo) {
      queryBuilder.andWhere('LOWER(video.titulo) LIKE :titulo', {
        titulo: `%${query.titulo.toLowerCase()}%`,
      });
    }

    if (query.data) {
      queryBuilder.andWhere('video.data = :data', { data: query.data });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Video> {
    const video = await this.videoRepository.findOne({ where: { id } });

    if (!video) {
      throw new NotFoundException(`Video com id ${id} não encontrado`);
    }

    return video;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.findOne(id);
    const updatedVideo = this.videoRepository.merge(video, updateVideoDto);
    return this.videoRepository.save(updatedVideo);
  }

  async remove(id: number): Promise<void> {
    const video = await this.findOne(id);
    await this.videoRepository.remove(video);
  }
}
