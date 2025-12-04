import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordService } from '@src/account/domain/services/user/reset-password/reset.password.service';
import { ResetPasswordInputDto } from '@src/account/domain/services/user/reset-password/reset.password.input.dto';

@ApiTags('Usuários')
@Controller('user')
export class ResetPasswordController {
  constructor(private readonly service: ResetPasswordService) {}

  @Post('reset-password')
  @ApiOperation({ 
    summary: 'Redefinir senha',
    description: 'Redefinir senha'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Senha do usuário redefinida com sucesso.',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Senha atualizada com sucesso'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async handle(@Body() body: ResetPasswordInputDto) {
    return await this.service.execute(body);
  }
}
