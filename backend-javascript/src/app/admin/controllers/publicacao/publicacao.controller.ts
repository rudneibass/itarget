import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Render,
  Req,
} from '@nestjs/common';
import { PublicacaoAdminService } from '../../services/publicacao/publicacao.service';

@Controller('admin/publicacao')
export class PublicacaoController {
  constructor(private readonly publicacaoService: PublicacaoAdminService) {}

  @Get('list')
  @Render('pages/publicacao/list')
  renderList() {
    return {};
  }

  @Get('form')
  @Render('pages/publicacao/form')
  renderForm() {
    return {};
  }

  @Get('form/uuid/:uuid')
  @Render('pages/publicacao/form')
  renderFormByUuid(@Param('uuid') uuid: string) {
    return { uuid };
  }

  @Get('all')
  async findAll(@Req() req: any) {
    const organizacaoId = req.adminSession.usuario.organizacaoId;
    const data = await this.publicacaoService.findAll(organizacaoId);
    return { data };
  }

  @Get(':uuid')
  async get(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = req.adminSession.usuario.organizacaoId;
    const data = await this.publicacaoService.get(organizacaoId, uuid);
    return { data };
  }

  @Post()
  async create(@Req() req: any, @Body() payload: any) {
    try {
      const organizacaoId = req.adminSession.usuario.organizacaoId;
      const ownerUuid = req.adminSession.usuario.uuid;
      const data = await this.publicacaoService.create(organizacaoId, payload, ownerUuid);
      return { data };
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'Erro ao criar publicação', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':uuid')
  async update(@Req() req: any, @Param('uuid') uuid: string, @Body() payload: any) {
    const organizacaoId = req.adminSession.usuario.organizacaoId;
    const data = await this.publicacaoService.update(organizacaoId, uuid, payload);
    return { data };
  }

  @Delete(':uuid')
  async remove(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = req.adminSession.usuario.organizacaoId;
    await this.publicacaoService.remove(organizacaoId, uuid);
    return { message: 'Publicação removida com sucesso' };
  }

  @Post('sync-instagram')
  async syncInstagram(@Req() req: any) {
    const organizacaoId = req.adminSession.usuario.organizacaoId;
    const data = await this.publicacaoService.syncInstagram(organizacaoId);
    return { data };
  }
}
