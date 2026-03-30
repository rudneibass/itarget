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
  async findAll(
    @Req() req: any,
    @Query('entidadePai') entidadePai?: string,
    @Query('entidadePaiId') entidadePaiId?: string,
  ) {
    const organizacaoId = req.adminSession?.usuario?.organizacaoId;
    const data = await this.arquivoService.findAll(organizacaoId, { entidadePai, entidadePaiId });
    return { data };
  }

  @Get('avatar')
  async findAvatar(
    @Req() req: any,
    @Query('entidadePai') entidadePai?: string,
    @Query('entidadePaiId') entidadePaiId?: string,
  ) {
    const normalizedEntidadePai = (entidadePai || '').trim();
    const normalizedId = Number(entidadePaiId);

    if (!normalizedEntidadePai || !Number.isInteger(normalizedId) || normalizedId <= 0) {
      return { data: null };
    }

    const organizacaoId = req.adminSession?.usuario?.organizacaoId;
    const data = await this.arquivoService.findLatestImageByEntity(organizacaoId, normalizedEntidadePai, normalizedId);
    return { data };
  }

  @Get(':uuid')
  async get(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = req.adminSession?.usuario?.organizacaoId;
    const data = await this.arquivoService.get(organizacaoId, uuid);
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
      const organizacaoId = req.adminSession?.usuario?.organizacaoId;
      if (!ownerUuid) {
        throw new BadRequestException('Sessão inválida para upload');
      }

      const data = await this.arquivoService.createFromUpload(
        organizacaoId,
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
  async remove(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = req.adminSession?.usuario?.organizacaoId;
    await this.arquivoService.remove(organizacaoId, uuid);
    return { message: 'Arquivo removido com sucesso' };
  }
}
