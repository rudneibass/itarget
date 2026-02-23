import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AtualizarPermissaoUsuarioDto } from '../../dtos/admin/atualizar-permissao-usuario.dto';
import { SalvarRecompensaDto } from '../../dtos/admin/salvar-recompensa.dto';
import { EconomiaService } from '../../services/economia/economia-social.service';

@Controller('admin/social')
export class AdminController {
  constructor(private readonly economyService: EconomiaService) {}

  @Get('users')
  async listStudents(@Query('organizacaoUuid') organizacaoUuid: string) {
    const data = await this.economyService.listUsersByOrganization(organizacaoUuid);
    return { data };
  }

  @Patch('permissions/:usuarioUuid')
  async updatePermission(
    @Param('usuarioUuid') usuarioUuid: string,
    @Body() dto: AtualizarPermissaoUsuarioDto,
  ) {
    const data = await this.economyService.updateUserPermission(usuarioUuid, dto);
    return { data };
  }

  @Get('rewards')
  async listarRecompensas(@Query('organizacaoUuid') organizacaoUuid: string) {
    const data = await this.economyService.listarRecompensas(organizacaoUuid);
    return { data };
  }

  @Post('rewards')
  async createReward(@Query('organizacaoUuid') organizacaoUuid: string, @Body() dto: SalvarRecompensaDto) {
    const data = await this.economyService.upsertReward(organizacaoUuid, dto);
    return { data };
  }

  @Patch('rewards/:recompensaUuid')
  async toggleReward(@Param('recompensaUuid') recompensaUuid: string, @Body('ativo') ativo: boolean) {
    const data = await this.economyService.toggleReward(recompensaUuid, ativo);
    return { data };
  }
}
