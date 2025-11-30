import { Module } from '@nestjs/common';
import { CreateUserController } from './infra/controllers/user/create/create.user.contrller';
import { CreateOrganizationController } from './infra/controllers/organization/create/create.organization.contrller';

import { CreateUserService } from './domain/services/user/create/create.user.service';
import { CreateOrganizationService } from './domain/services/organization/create/create.organization.service';

import { UserRepository } from './domain/repositories/user/database/user.repository';
import { CreateOrganizationRepository } from './domain/repositories/organization/database/create.organization.repository';

import { DatabaseAdapter } from './infra/adapters/database/database.adapter';
import { HashProviderAdapter } from './infra/adapters/hash/hash.provider.adapter';
import { MailerAdapter } from './infra/adapters/mailer/mailer.adapter';


@Module({
  imports: [],
  controllers: [CreateOrganizationController, CreateUserController],
  providers: [
    { provide: 'DatabaseAdapterInterface', useClass: DatabaseAdapter},
    { provide: 'HashAdapterInterface', useClass: HashProviderAdapter},
    { provide: 'MailerAdapterInterface', useClass: MailerAdapter},
    
    CreateUserService,
    UserRepository,

    CreateOrganizationService,
    CreateOrganizationRepository,

  ],
})
export class AccountModule {}
