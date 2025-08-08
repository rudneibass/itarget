import { Module } from '@nestjs/common';
import { CreateUserController } from '@src/account/infra/controllers/user/create/create.user.contrller';
import { DatabaseAdapter } from '@src/account/infra/adapters/database/database.adapter';
import { CreateUserRepository } from '@src/account/domain/repositories/user/database/create.user.repository';
import { CreateUserService } from '@src/account/domain/services/user/create/create.user.service';
import { DeleteUserController } from '@src/account/infra/controllers/user/delete/delete.user.controller';
import { DeleteUserService } from '@src/account/domain/services/user/delete/dekete.user.service';
import { DeleteUserRepository } from '@src/account/domain/repositories/user/database/delete.user.repository';

@Module({
  imports: [],
  controllers: [CreateUserController, DeleteUserController],
  providers: [
    {
      provide: 'IDatabaseAdapter',
      useClass: DatabaseAdapter,
    },
    CreateUserService,
    CreateUserRepository,
    DeleteUserService,
    DeleteUserRepository

  ],
})
export class AccountModule {}
