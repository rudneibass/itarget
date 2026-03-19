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
} from '@nestjs/common';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Controller('admin/usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('list')
  @Render('pages/usuario/list')
  renderList() {
    return {};
  }

  @Get('form')
  @Render('pages/usuario/form')
  renderForm() {
    return {};
  }

  @Get('form/uuid/:uuid')
  @Render('pages/usuario/form')
  renderFormByUuid(@Param('uuid') uuid: string) {
    return { uuid };
  }

  @Get('organizacoes')
  async listOrganizations() {
    const data = await this.usuarioService.listOrganizations();
    return { data };
  }

  @Get('all')
  async findAll() {
    const data = await this.usuarioService.findAll();
    return { data };
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string) {
    const data = await this.usuarioService.get(uuid);
    return { data };
  }

  @Post()
  async create(@Body() payload: any) {
    try {
      const data = await this.usuarioService.create(payload);
      return { data };
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'Erro ao criar usuário', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() payload: any) {
    const data = await this.usuarioService.update(uuid, payload);
    return { data };
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.usuarioService.remove(uuid);
    return { message: 'Usuário removido com sucesso' };
  }
}
