import { Controller, Delete, Param } from "@nestjs/common";
import { DeleteUserService } from '@src/account/domain/services/user/delete/dekete.user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('usuarios')
@Controller('user')
export class DeleteUserController{
    constructor(private readonly service: DeleteUserService) {}

    @Delete(':id')
    @ApiOperation({ 
      summary: 'Remove um usuário pelo ID',
      description: 'Remove um usuário do sistema pelo seu ID'
    })
    @ApiParam({ 
      name: 'id', 
      type: String, 
      description: 'ID do usuário a ser removido',
      example: '123'
    })
    @ApiResponse({ 
      status: 200, 
      description: 'Usuário removido com sucesso',
      schema: {
        type: 'object',
        properties: {
          affectedRows: {
            type: 'number',
            description: 'Número de linhas afetadas'
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
    async handle(@Param('id') id:string){
        return this.service.execute(id)
    }
}