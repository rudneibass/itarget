import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePasswordResetTokenService } from '@src/account/domain/services/password-reset-token/create.password.reset.token.service';
import { CreatePasswordResetTokenInputDto } from '@src/account/domain/services/password-reset-token/create.password.reset.token.input.dto';

@ApiTags('Recuperar Senha')
@Controller('password-reset-token')
export class CreatePasswordResetTokenController {
  constructor(private readonly service: CreatePasswordResetTokenService) {}

  @Post('create')
  @ApiOperation({ 
    summary: 'Redefinir senha',
    description: 'Cria URL para redefinição de senha'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Url criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        resetUrl: {
          type: 'string',
          description: 'URL para redefinir senha'
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
