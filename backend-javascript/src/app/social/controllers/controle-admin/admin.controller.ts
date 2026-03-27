import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { AtualizarPermissaoUsuarioDto } from '../../dtos/admin/atualizar-permissao-usuario.dto';
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
}
