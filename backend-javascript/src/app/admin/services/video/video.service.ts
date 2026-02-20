import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
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
    try {

      const payload = {
        ...createVideoDto,
        uuid: createVideoDto.uuid || randomUUID(),
        criadoEm: new Date(),
        alteracaoEm: new Date(),
      };

      const video = this.videoRepository.create(payload);
      return this.videoRepository.save(video);

    } catch (error) {
      throw new Error(error.message);
    }
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

  async get(uuid: string): Promise<Video> {
    const video = await this.videoRepository.findOne({ where: { uuid } });

    if (!video) {
      throw new NotFoundException(`Video com uuid ${uuid} não encontrado`);
    }

    return video;
  }

  async update(uuid: string, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.get(uuid);
    const updatedVideo = this.videoRepository.merge(video, updateVideoDto);
    return this.videoRepository.save(updatedVideo);
  }

  async remove(uuid: string): Promise<void> {
    const video = await this.get(uuid);
    await this.videoRepository.remove(video);
  }
}
