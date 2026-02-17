import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserService } from '@src/account/domain/services/user/create/create.user.service';
import { CreateUserServiceInputDto } from '@src/account/domain/services/user/create/create.user.service.input.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserService } from '@src/account/domain/services/user/add/add.user.service';
import { AddUserServiceInputDto } from '@src/account/domain/services/user/add/add.user.service.input.dto';
import { User } from '@src/account/domain/entities/user/user.entity';
import { UserRepository } from '@src/account/domain/repositories/user/database/user.repository';
import { HashProviderAdapter } from '@src/account/infra/adapters/hash/hash.provider.adapter';
import { MailerAdapter } from '@src/account/infra/adapters/mailer/mailer.adapter';
import { DatabaseAdapter } from '@src/account/infra/adapters/database/database.adapter';

@ApiTags('Usuários')
@Controller('user')
export class AddUserController {
  constructor(private readonly service: AddUserService) {}

  @Post('add')
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
  async handle(@Body() request: AddUserServiceInputDto ) {
    return await this.service.execute(request)
  }
}
