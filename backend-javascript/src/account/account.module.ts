import { Module } from '@nestjs/common';
import { CreateUserController } from './infra/controllers/user/create/create.user.contrller';
import { DatabaseAdapter } from './infra/adapters/database/database.adapter';
import { CreateUserRepository } from './domain/repositories/user/database/create.user.repository';
import { CreateUserService } from './domain/services/user/create.user.service';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [
    {
      provide: 'IDatabaseAdapter',
      useClass: DatabaseAdapter,
    },
    CreateUserRepository,
    CreateUserService,
  ],
})
export class AccountModule {}
