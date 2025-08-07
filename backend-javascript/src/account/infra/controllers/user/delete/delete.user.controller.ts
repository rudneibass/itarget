import { Controller, Delete, Param } from "@nestjs/common";
import { DeleteUserService } from "../../../../domain/services/user/delete/dekete.user.service";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller('user')
export class DeleteUserController{
    constructor(private readonly service: DeleteUserService) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um usuário pelo ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    async handle(@Param('id') id:string){
        return this.service.execute(id)
    }
}