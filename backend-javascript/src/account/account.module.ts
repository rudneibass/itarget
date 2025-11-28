import { Module } from '@nestjs/common';
import { CreateUserController } from '@src/account/infra/controllers/user/create/create.user.contrller';
import { DatabaseAdapter } from '@src/account/infra/adapters/database/database.adapter';
import { CreateUserRepository } from '@src/account/domain/repositories/user/database/create.user.repository';
import { CreateUserService } from '@src/account/domain/services/user/create/create.user.service';
import { DeleteUserController } from '@src/account/infra/controllers/user/delete/delete.user.controller';
import { DeleteUserService } from '@src/account/domain/services/user/delete/delete.user.service';
import { DeleteUserRepository } from '@src/account/domain/repositories/user/database/delete.user.repository';
import { CreateOrganizationController } from './infra/controllers/organization/create/create.organization.contrller';
import { CreateOrganizationService } from './domain/services/organization/create/create.organization.service';
import { CreateOrganizationRepository } from './domain/repositories/organization/database/create.organization.repository';
import { HashProviderAdapter } from './infra/adapters/hash/hash.provider.adapter';

@Module({
  imports: [],
  controllers: [CreateOrganizationController, CreateUserController, DeleteUserController],
  providers: [
    {
      provide: 'DatabaseAdapterInterface',
      useClass: DatabaseAdapter,
    },
    {
      provide: 'HashAdapterInterface',
      useClass: HashProviderAdapter,
    },
    CreateUserService,
    CreateUserRepository,
    DeleteUserService,
    DeleteUserRepository,

    CreateOrganizationService,
    CreateOrganizationRepository,

  ],
})
export class AccountModule {}
