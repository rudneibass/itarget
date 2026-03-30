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
import { PerfilInstagramService } from '../../services/perfil-instagram/perfil-instagram.service';

@Controller('admin/perfil-instagram')
export class PerfilInstagramController {
  constructor(private readonly perfilInstagramService: PerfilInstagramService) {}

  @Get('list')
  @Render('pages/perfil-instagram/list')
  renderList() {
    return {};
  }

  @Get('form')
  @Render('pages/perfil-instagram/form')
  renderForm() {
    return {};
  }

  @Get('form/uuid/:uuid')
  @Render('pages/perfil-instagram/form')
  renderFormByUuid(@Param('uuid') uuid: string) {
    return { uuid };
  }

  @Get('all')
  async findAll(@Req() req: any) {
    const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
    const data = await this.perfilInstagramService.findAll(organizacaoId);
    return { data };
  }

  @Get(':uuid')
  async get(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
    const data = await this.perfilInstagramService.get(organizacaoId, uuid);
    return { data };
  }

  @Post()
  async create(@Req() req: any, @Body() payload: any) {
    try {
      const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
      const data = await this.perfilInstagramService.create(organizacaoId, payload);
      return { data };
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'Erro ao criar perfil de Instagram', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':uuid')
  async update(@Req() req: any, @Param('uuid') uuid: string, @Body() payload: any) {
    const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
    const data = await this.perfilInstagramService.update(organizacaoId, uuid, payload);
    return { data };
  }

  @Delete(':uuid')
  async remove(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
    await this.perfilInstagramService.remove(organizacaoId, uuid);
    return { message: 'Perfil de Instagram removido com sucesso' };
  }

  @Post(':uuid/sync-instagram')
  async syncInstagram(@Req() req: any, @Param('uuid') uuid: string) {
    try {
      const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
      const data = await this.perfilInstagramService.syncInstagram(organizacaoId, uuid);
      return { data };
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'Erro ao sincronizar perfil de Instagram', HttpStatus.BAD_REQUEST);
    }
  }
}
