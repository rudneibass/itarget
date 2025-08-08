import { Injectable } from "@nestjs/common";
import { DeleteUserRepository } from '@src/account/domain/repositories/user/database/delete.user.repository';

@Injectable()
export class DeleteUserService {
    constructor(private readonly repository: DeleteUserRepository) {}
    
    async execute(id: string){
        return await this.repository.delete(id)
    }
}