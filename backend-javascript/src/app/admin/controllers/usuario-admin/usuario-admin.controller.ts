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
import { CreateUsuarioAdminDto } from '../../dtos/usuario-admin/create-usuario-admin.dto';
import { UpdateUsuarioAdminDto } from '../../dtos/usuario-admin/update-usuario-admin.dto';
import { UsuarioAdminService } from '../../services/usuario-admin/usuario-admin.service';

@Controller('admin/usuario')
export class UsuarioAdminController {
  constructor(private readonly usuarioAdminService: UsuarioAdminService) {}

  @Get('list')
  @Render('pages/usuario-admin/list')
  renderList() {
    return {};
  }

  @Get('form')
  @Render('pages/usuario-admin/form')
  renderForm() {
    return {};
  }

  @Get('form/uuid/:uuid')
  @Render('pages/usuario-admin/form')
  renderFormByUuid(@Param('uuid') uuid: string) {
    return { uuid };
  }

  @Get('me')
  @Render('pages/usuario-admin/form')
  renderMe(@Req() req: any) {
    const uuid = req.adminSession?.usuario?.uuid || null;
    return { uuid };
  }

  @Get('all')
  async findAll() {
    const data = await this.usuarioAdminService.findAll();
    return { data };
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string) {
    const data = await this.usuarioAdminService.get(uuid);
    return { data };
  }

  @Post()
  async create(@Body() payload: CreateUsuarioAdminDto) {
    try {
      const data = await this.usuarioAdminService.create(payload);
      return { data };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar usuário admin',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() payload: UpdateUsuarioAdminDto) {
    try {
      const data = await this.usuarioAdminService.update(uuid, payload);
      return { data };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao atualizar usuário admin',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    try {
      await this.usuarioAdminService.remove(uuid);
      return { message: 'Usuário admin removido com sucesso' };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover usuário admin',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
