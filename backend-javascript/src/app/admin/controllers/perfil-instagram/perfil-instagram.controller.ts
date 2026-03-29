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
    const ownerUuid = req.adminSession.usuario.uuid;
    const data = await this.perfilInstagramService.findAll(ownerUuid);
    return { data };
  }

  @Get(':uuid')
  async get(@Req() req: any, @Param('uuid') uuid: string) {
    const ownerUuid = req.adminSession.usuario.uuid;
    const data = await this.perfilInstagramService.get(ownerUuid, uuid);
    return { data };
  }

  @Post()
  async create(@Req() req: any, @Body() payload: any) {
    try {
      const ownerUuid = req.adminSession.usuario.uuid;
      const data = await this.perfilInstagramService.create(ownerUuid, payload);
      return { data };
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'Erro ao criar perfil de Instagram', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':uuid')
  async update(@Req() req: any, @Param('uuid') uuid: string, @Body() payload: any) {
    const ownerUuid = req.adminSession.usuario.uuid;
    const data = await this.perfilInstagramService.update(ownerUuid, uuid, payload);
    return { data };
  }

  @Delete(':uuid')
  async remove(@Req() req: any, @Param('uuid') uuid: string) {
    const ownerUuid = req.adminSession.usuario.uuid;
    await this.perfilInstagramService.remove(ownerUuid, uuid);
    return { message: 'Perfil de Instagram removido com sucesso' };
  }

  @Post(':uuid/sync-instagram')
  async syncInstagram(@Req() req: any, @Param('uuid') uuid: string) {
    try {
      const ownerUuid = req.adminSession.usuario.uuid;
      const data = await this.perfilInstagramService.syncInstagram(ownerUuid, uuid);
      return { data };
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'Erro ao sincronizar perfil de Instagram', HttpStatus.BAD_REQUEST);
    }
  }
}
