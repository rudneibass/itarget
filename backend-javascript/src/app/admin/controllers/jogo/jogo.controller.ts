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
  async findAll(@Req() req: any) {
    const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
    const data = await this.jogoService.findAll(organizacaoId);
    return { data };
  }

  @Get(':uuid')
  async get(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
    const data = await this.jogoService.get(uuid, organizacaoId);
    return { data };
  }

  @Post()
  async create(@Req() req: any, @Body() payload: any) {
    try {
      const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
      const data = await this.jogoService.create(organizacaoId, payload);
      return { data };
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'Erro ao criar jogo', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':uuid')
  async update(@Req() req: any, @Param('uuid') uuid: string, @Body() payload: any) {
    const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
    const data = await this.jogoService.update(uuid, payload, organizacaoId);
    return { data };
  }

  @Delete(':uuid')
  async remove(@Req() req: any, @Param('uuid') uuid: string) {
    const organizacaoId = Number(req.adminSession?.usuario?.organizacaoId || 0);
    await this.jogoService.remove(uuid, organizacaoId);
    return { message: 'Jogo removido com sucesso' };
  }
}
