import { Body, Controller, Get, Param } from '@nestjs/common';
import { FindUserService } from '@src/account/domain/services/user/find/find.user.service';
import { FindUserServiceInputDto } from '@src/account/domain/services/user/find/find.user.service.input.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('user')
export class FindUserController {
  constructor(private readonly service: FindUserService) {}

  @Get('/find')
  @ApiOperation({ 
    summary: 'Buscar usuário pelo ID',
    description: 'Busca um usuário no sistema pelo seu ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: String, 
    description: 'ID do usuário a ser buscado',
    example: '123'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuário encontrado com sucesso',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Nome do usuário'
        },
        email: {
          type: 'string',
          description: 'Email do usuário'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Erro interno do servidor' 
  })
  async handle(@Body() body: FindUserServiceInputDto) {
    return await this.service.execute(new FindUserServiceInputDto(body));
  }
} 