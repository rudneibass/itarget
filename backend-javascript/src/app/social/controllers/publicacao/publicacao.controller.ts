import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { CriarComentarioDto } from '../../dtos/publicacao/criar-comentario.dto';
import { CriarPublicacaoDto } from '../../dtos/publicacao/criar-publicacao.dto';
import { PublicacaoService } from '../../services/publicacao/publicacao-social.service';

@Controller('social/feed')
export class PublicacaoController {
  constructor(private readonly feedService: PublicacaoService) {}

  @Get('timeline')
  async timeline(@Req() req: any) {
    const session = req.socialSession;
    const data = await this.feedService.listTimeline(session.organizacaoUuid, session.usuario.uuid);
    return { data };
  }

  @Post('post')
  async criarPublicacao(@Req() req: any, @Body() dto: CriarPublicacaoDto) {
    const data = await this.feedService.criarPublicacao(req.socialSession, dto);
    return { data };
  }

  @Post('upload-media')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          const uploadDir = join(process.cwd(), 'uploads', 'social');
          if (!existsSync(uploadDir)) {
            mkdirSync(uploadDir, { recursive: true });
          }
          callback(null, uploadDir);
        },
        filename: (_req, file, callback) => {
          callback(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        const allowed = file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/');
        callback(null, allowed);
      },
      limits: {
        fileSize: 30 * 1024 * 1024,
      },
    }),
  )
  async uploadMedia(@Req() req: any, @UploadedFile() file?: any) {
    const session = req.socialSession;
    if (!session.usuario.podePostarMidia) {
      throw new BadRequestException('Você não tem permissão para enviar mídia');
    }

    if (!file) {
      throw new BadRequestException('Arquivo de mídia não enviado ou tipo não suportado');
    }

    const tipo = file.mimetype.startsWith('video/') ? 'video' : 'imagem';
    const url = `/social/uploads/${file.filename}`;
    return {
      data: {
        midiaUrl: url,
        tipo,
      },
    };
  }

  @Post('post/:publicacaoUuid/comment')
  async comment(@Req() req: any, @Param('publicacaoUuid') publicacaoUuid: string, @Body() dto: CriarComentarioDto) {
    const data = await this.feedService.adicionarComentario(req.socialSession, publicacaoUuid, dto);
    return { data };
  }

  @Get('post/:publicacaoUuid/comments')
  async listComments(@Req() req: any, @Param('publicacaoUuid') publicacaoUuid: string) {
    const data = await this.feedService.listarComentarios(req.socialSession, publicacaoUuid);
    return { data };
  }

  @Post('post/:publicacaoUuid/like')
  async like(@Req() req: any, @Param('publicacaoUuid') publicacaoUuid: string) {
    const data = await this.feedService.alternarCurtida(req.socialSession, publicacaoUuid);
    return { data };
  }

  @Post('post/:publicacaoUuid/compartilhar')
  async compartilhar(@Req() req: any, @Param('publicacaoUuid') publicacaoUuid: string) {
    const data = await this.feedService.compartilhar(req.socialSession, publicacaoUuid);
    return { data };
  }

  @Delete('post/:publicacaoUuid')
  async excluir(@Req() req: any, @Param('publicacaoUuid') publicacaoUuid: string) {
    const data = await this.feedService.excluirPublicacao(req.socialSession, publicacaoUuid);
    return { data };
  }
}
