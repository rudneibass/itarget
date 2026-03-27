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
import { JogoService } from '../../services/jogo/jogo.service';

@Controller('admin/jogo')
export class JogoController {
  constructor(private readonly jogoService: JogoService) {}

  @Get('list')
  @Render('pages/jogo/list')
  renderList() {
    return {};
  }

  @Get('form')
  @Render('pages/jogo/form')
  renderForm() {
    return {};
  }

  @Get('form/uuid/:uuid')
  @Render('pages/jogo/form')
  renderFormByUuid(@Param('uuid') uuid: string) {
    return { uuid };
  }

  @Get('all')
  async findAll() {
    const data = await this.jogoService.findAll();
    return { data };
  }

  @Get(':uuid')
  async get(@Param('uuid') uuid: string) {
    const data = await this.jogoService.get(uuid);
    return { data };
  }

  @Post()
  async create(@Req() req: any, @Body() payload: any) {
    try {
      const ownerUuid = req.adminSession.usuario.uuid;
      const data = await this.jogoService.create(ownerUuid, payload);
      return { data };
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'Erro ao criar jogo', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() payload: any) {
    const data = await this.jogoService.update(uuid, payload);
    return { data };
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.jogoService.remove(uuid);
    return { message: 'Jogo removido com sucesso' };
  }
}
