import { Module } from '@nestjs/common';
import { CreateUserController } from './infra/controllers/user/create/create.user.contrller';
import { DatabaseAdapter } from './infra/adapters/database/database.adapter';
import { CreateUserRepository } from './domain/repositories/user/database/create.user.repository';
import { CreateUserService } from './domain/services/user/create/create.user.service';
import { DeleteUserController } from './infra/controllers/user/delete/delete.user.controller';
import { DeleteUserService } from './domain/services/user/delete/dekete.user.service';
import { DeleteUserRepository } from './domain/repositories/user/database/delete.user.repository';

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
