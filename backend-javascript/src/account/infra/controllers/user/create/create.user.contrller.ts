import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserService } from '@src/account/domain/services/user/create/create.user.service';
import { CreateUserServiceInputDto } from '@src/account/domain/services/user/create/create.user.service.input.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('user')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ 
    summary: 'Criar novo usuário',
    description: 'Cria um novo usuário no sistema'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'Number',
          description: 'ID do usuário criado'
        },
        message: {
          type: 'string',
          description: 'Usuário criado com'
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
  async handle(@Body() body: CreateUserServiceInputDto) {
    return await this.service.execute(body);
  }
}
