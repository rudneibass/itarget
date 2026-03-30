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
import { UsuarioSocialService } from '../../services/usuario-social/usuario-social.service';

@Controller('admin/usuario-social')
export class UsuarioSocialController {
  constructor(private readonly usuarioSocialService: UsuarioSocialService) {}

  @Get('list')
  @Render('pages/usuario-social/list')
  renderList() {
    return {};
  }

  @Get('form')
  @Render('pages/usuario-social/form')
  renderForm() {
    return { uuid: null };
  }

  @Get('form/uuid/:uuid')
  @Render('pages/usuario-social/form')
  renderFormByUuid(@Param('uuid') uuid: string) {
    return { uuid };
  }

  @Get('all')
  async findAll(@Req() req: any) {
    const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
    if (!Number.isInteger(organizacaoId) || organizacaoId <= 0) {
      return { data: [] };
    }

    const data = await this.usuarioSocialService.findAll(organizacaoId);
    return { data };
  }

  @Get('colaboradores')
  async findColaboradores(@Req() req: any) {
    return this.findAll(req);
  }

  @Get('organizacoes')
  async listOrganizations() {
    return { data: [] };
  }

  @Get(':uuid')
  async get(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
    const data = await this.usuarioSocialService.get(uuid, organizacaoId);
    return { data };
  }

  @Post()
  async create(@Req() req: any, @Body() payload: any) {
    try {
      const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
      const data = await this.usuarioSocialService.create(payload, organizacaoId);
      return { data };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar usuário social',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':uuid')
  async update(@Req() req: any, @Param('uuid') uuid: string, @Body() payload: any) {
    try {
      const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
      const data = await this.usuarioSocialService.update(uuid, payload, organizacaoId);
      return { data };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao atualizar usuário social',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':uuid')
  async remove(@Req() req: any, @Param('uuid') uuid: string) {
    try {
      const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
      await this.usuarioSocialService.remove(uuid, organizacaoId);
      return { message: 'Usuário social removido com sucesso' };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover usuário social',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
