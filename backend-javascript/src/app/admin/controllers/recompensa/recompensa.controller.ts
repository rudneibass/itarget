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
import { RecompensaService } from '../../services/recompensa/recompensa.service';

@Controller('admin/recompensa')
export class RecompensaController {
  constructor(private readonly recompensaService: RecompensaService) {}

  @Get('list')
  @Render('pages/recompensa/list')
  renderList() {
    return {};
  }

  @Get('form')
  @Render('pages/recompensa/form')
  renderForm() {
    return {};
  }

  @Get('form/uuid/:uuid')
  @Render('pages/recompensa/form')
  renderFormByUuid(@Param('uuid') uuid: string) {
    return { uuid };
  }

  @Get('organizacoes')
  async listOrganizations() {
    const data = await this.recompensaService.listOrganizations();
    return { data };
  }

  @Get('all')
  async findAll() {
    const data = await this.recompensaService.findAll();
    return { data };
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string) {
    const data = await this.recompensaService.get(uuid);
    return { data };
  }

  @Post()
  async create(@Body() payload: any) {
    try {
      const data = await this.recompensaService.create(payload);
      return { data };
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'Erro ao criar recompensa', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() payload: any) {
    const data = await this.recompensaService.update(uuid, payload);
    return { data };
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.recompensaService.remove(uuid);
    return { message: 'Recompensa removida com sucesso' };
  }
}
