import { Module } from '@nestjs/common';
import { CreateUserController } from '@src/account/infra/controllers/user/create/create.user.contrller';
import { DatabaseAdapter } from '@src/account/infra/adapters/database/database.adapter';
import { CreateUserRepository } from '@src/account/domain/repositories/user/database/create.user.repository';
import { CreateUserService } from '@src/account/domain/services/user/create/create.user.service';
import { DeleteUserController } from '@src/account/infra/controllers/user/delete/delete.user.controller';
import { DeleteUserService } from '@src/account/domain/services/user/delete/dekete.user.service';
import { DeleteUserRepository } from '@src/account/domain/repositories/user/database/delete.user.repository';
import { FindUserController } from '@src/account/infra/controllers/user/find/find.user.controller';
import { FindUserService } from '@src/account/domain/services/user/find/find.user.service';
import { FindUserRepository } from '@src/account/domain/repositories/user/database/find.user.repository';

@Module({
  controllers: [
    CreateUserController,
    DeleteUserController,
    FindUserController,
  ],
  providers: [
    {
      provide: 'IDatabaseAdapter',
      useClass: DatabaseAdapter,
    },
    CreateUserRepository,
    CreateUserService,
    DeleteUserRepository,
    DeleteUserService,
    FindUserRepository,
    FindUserService,
  ],
})
export class AccountModule {}
