import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePasswordResetTokenService } from '@src/account/domain/services/password-reset-token/create.password.reset.token.service';
import { CreatePasswordResetTokenInputDto } from '@src/account/domain/services/password-reset-token/create.password.reset.token.input.dto';

@ApiTags('Usuários')
@Controller('user')
export class ForgotPasswordController {
  constructor(private readonly service: CreatePasswordResetTokenService) {}

  @Post('forgot-password')
  @ApiOperation({ 
    summary: 'Solicitar recuperação de senha',
    description: 'Cria URL para redefinição de senha'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Url criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          description: 'true/false'
        },
        resetUrl: {
          type: 'string',
          description: 'Enviamos uma url para redefinição de senha para seu email.'
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
  async handle(@Body() body: CreatePasswordResetTokenInputDto) {
    return await this.service.execute(body);
  }
}
