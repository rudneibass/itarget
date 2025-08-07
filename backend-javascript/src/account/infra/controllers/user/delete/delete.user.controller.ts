import { Controller, Delete, Param } from "@nestjs/common";
import { DeleteUserService } from "../../../../domain/services/user/delete/dekete.user.service";

@Controller('user')
export class DeleteUserController{
    constructor(private readonly service: DeleteUserService) {}

    @Delete(':id')
    async handle(@Param('id') id:string){
        return this.service.execute(id)
    }
}