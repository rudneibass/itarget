import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrganizationService } from '@src/account/domain/services/organization/create/create.organization.service';
import { CreateOrganizationServiceInputDto } from '@src/account/domain/services/organization/create/create.organization.service.input.dto';

@ApiTags('Organizações')
@Controller('organization')
export class CreateOrganizationController {
  constructor(private readonly service: CreateOrganizationService) {}

  @Post('create')
  @ApiOperation({ 
    summary: 'Criar nova organização',
    description: 'Cria uma nova organização no sistema'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Organização criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'ID da organização criada'
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
  async handle(@Body() body: CreateOrganizationServiceInputDto) {
    return await this.service.execute(body);
  }
}
