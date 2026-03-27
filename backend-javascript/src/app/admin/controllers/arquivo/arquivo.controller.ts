import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { ArquivoService } from '../../services/arquivo/arquivo.service';

@Controller('admin/arquivo')
export class ArquivoController {
  constructor(private readonly arquivoService: ArquivoService) {}

  @Get('list')
  @Render('pages/arquivo/list')
  renderList() {
    return {};
  }

  @Get('form')
  @Render('pages/arquivo/form')
  renderForm(@Query('idTabelaPai') idTabelaPai?: string, @Query('tabelaPai') tabelaPai?: string) {
    return {
      idTabelaPai: idTabelaPai || '',
      tabelaPai: tabelaPai || '',
    };
  }

  @Get('all')
  async findAll(@Query('entidadePai') entidadePai?: string, @Query('entidadePaiId') entidadePaiId?: string) {
    const data = await this.arquivoService.findAll({ entidadePai, entidadePaiId });
    return { data };
  }

  @Get('avatar')
  async findAvatar(@Query('entidadePai') entidadePai?: string, @Query('entidadePaiId') entidadePaiId?: string) {
    const normalizedEntidadePai = (entidadePai || '').trim();
    const normalizedId = Number(entidadePaiId);

    if (!normalizedEntidadePai || !Number.isInteger(normalizedId) || normalizedId <= 0) {
      return { data: null };
    }

    const data = await this.arquivoService.findLatestImageByEntity(normalizedEntidadePai, normalizedId);
    return { data };
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string) {
    const data = await this.arquivoService.get(uuid);
    return { data };
  }

  @Post('upload-local-server')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          const uploadDir = join(process.cwd(), 'uploads', 'admin');
          if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
          }
          callback(null, uploadDir);
        },
        filename: (_req, file, callback) => {
          callback(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 30 * 1024 * 1024,
      },
    }),
  )
  async uploadLocalServer(
    @Req() req: any,
    @UploadedFile() file: any,
    @Query('entidadePai') entidadePai?: string,
    @Query('entidadePaiId') entidadePaiId?: string,
    @Query('slug') slug?: string,
  ) {
    try {
      const ownerUuid = req.adminSession?.usuario?.uuid;
      if (!ownerUuid) {
        throw new BadRequestException('Sessão inválida para upload');
      }

      const data = await this.arquivoService.createFromUpload(
        ownerUuid,
        {
          entidadePai,
          entidadePaiId,
          slug,
        },
        file,
      );

      return { data };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao enviar arquivo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.arquivoService.remove(uuid);
    return { message: 'Arquivo removido com sucesso' };
  }
}
