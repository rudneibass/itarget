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
  Query,
  Render,
  Req,
} from '@nestjs/common';
import { CreateOrganizacaoDto } from '../../dtos/organizacao/create-organizacao.dto';
import { ListOrganizacaoQueryDto } from '../../dtos/organizacao/list-organizacao-query.dto';
import { UpdateOrganizacaoDto } from '../../dtos/organizacao/update-organizacao.dto';
import { OrganizacaoService } from '../../services/organizacao/organizacao.service';

@Controller('admin/organizacao')
export class OrganizacaoController {
  constructor(private readonly organizacaoService: OrganizacaoService) {}

  @Get('list')
  @Render('pages/organizacao/list')
  renderList() {
    return {};
  }

  @Get('form')
  @Render('pages/organizacao/form')
  async renderForm(@Req() req: any) {
    const organizacaoId = req.adminSession?.usuario?.organizacaoId;
    const organizacao = await this.organizacaoService.getByOrganizationId(organizacaoId);
    return { uuid: organizacao?.uuid ?? null };
  }

  @Get('form/uuid/:uuid')
  @Render('pages/organizacao/form')
  async renderFormByUuid(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = req.adminSession?.usuario?.organizacaoId;
    if (!organizacaoId) {
      return { uuid: null };
    }

    const organizacao = await this.organizacaoService.getByOrganizationId(organizacaoId);
    return { uuid: organizacao?.uuid === uuid ? organizacao.uuid : null };
  }

  @Get('all')
  async findAll(@Req() req: any) {
    const organizacaoId = req.adminSession.usuario.organizacaoId;
    const data = await this.organizacaoService.findAll(organizacaoId);
    return { data };
  }

  @Get(':uuid')
  async get(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = req.adminSession.usuario.organizacaoId;
    const data = await this.organizacaoService.get(organizacaoId, uuid);
    return { data };
  }

  @Post()
  async create(
    @Req() req: any,
    @Body() createOrganizacaoDto: CreateOrganizacaoDto,
  ) {
    try {
      const ownerUuid = req.adminSession.usuario.uuid;
      const organizacaoId = req.adminSession.usuario.organizacaoId;
      const data = await this.organizacaoService.create(ownerUuid, organizacaoId, createOrganizacaoDto);
      return { data };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao criar organização',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':uuid')
  async update(
    @Req() req: any,
    @Param('uuid') uuid: string,
    @Body() updateOrganizacaoDto: UpdateOrganizacaoDto,
  ) {
    try {
      const organizacaoId = req.adminSession.usuario.organizacaoId;
      const data = await this.organizacaoService.update(organizacaoId, uuid, updateOrganizacaoDto);
      return { data };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao atualizar organização',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':uuid')
  async remove(@Req() req: any, @Param('uuid') uuid: string) {
    try {
      const organizacaoId = req.adminSession.usuario.organizacaoId;
      await this.organizacaoService.remove(organizacaoId, uuid);
      return { message: 'Organização removida com sucesso' };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover organização',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
