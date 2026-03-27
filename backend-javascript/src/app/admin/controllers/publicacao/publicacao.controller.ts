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
  async findAll() {
    const data = await this.publicacaoService.findAll();
    return { data };
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string) {
    const data = await this.publicacaoService.get(uuid);
    return { data };
  }

  @Post()
  async create(@Req() req: any, @Body() payload: any) {
    try {
      const ownerUuid = req.adminSession.usuario.uuid;
      const data = await this.publicacaoService.create(ownerUuid, payload);
      return { data };
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'Erro ao criar publicação', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() payload: any) {
    const data = await this.publicacaoService.update(uuid, payload);
    return { data };
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.publicacaoService.remove(uuid);
    return { message: 'Publicação removida com sucesso' };
  }

  @Post('sync-instagram')
  async syncInstagram(@Req() req: any) {
    const ownerUuid = req.adminSession.usuario.uuid;
    const data = await this.publicacaoService.syncInstagram(ownerUuid);
    return { data };
  }
}
