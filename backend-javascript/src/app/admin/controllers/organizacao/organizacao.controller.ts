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
    const ownerUuid = req.adminSession?.usuario?.uuid;
    const uuid = ownerUuid ? await this.organizacaoService.getOwnedOrganizationUuid(ownerUuid) : null;
    return { uuid };
  }

  @Get('form/uuid/:uuid')
  @Render('pages/organizacao/form')
  async renderFormByUuid(@Req() req: any, @Param('uuid') uuid: string) {
    const ownerUuid = req.adminSession?.usuario?.uuid;
    if (!ownerUuid) {
      return { uuid: null };
    }

    const ownedUuid = await this.organizacaoService.getOwnedOrganizationUuid(ownerUuid);
    return { uuid: ownedUuid === uuid ? ownedUuid : null };
  }

  @Get('all')
  async findAll(@Req() req: any) {
    const ownerUuid = req.adminSession.usuario.uuid;
    const data = await this.organizacaoService.findAll(ownerUuid);
    return { data };
  }

  @Get(':uuid')
  async get(@Req() req: any, @Param('uuid') uuid: string) {
    const ownerUuid = req.adminSession.usuario.uuid;
    const data = await this.organizacaoService.get(ownerUuid, uuid);
    return { data };
  }

  @Post()
  async create(
    @Req() req: any,
    @Body() createOrganizacaoDto: CreateOrganizacaoDto,
  ) {
    try {
      const ownerUuid = req.adminSession.usuario.uuid;
      const data = await this.organizacaoService.create(ownerUuid, createOrganizacaoDto);
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
      const ownerUuid = req.adminSession.usuario.uuid;
      const data = await this.organizacaoService.update(ownerUuid, uuid, updateOrganizacaoDto);
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
      const ownerUuid = req.adminSession.usuario.uuid;
      await this.organizacaoService.remove(ownerUuid, uuid);
      return { message: 'Organização removida com sucesso' };
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Erro ao remover organização',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
