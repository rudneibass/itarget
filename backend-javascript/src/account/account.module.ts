import { Module } from '@nestjs/common';

import { CreateUserController } from './infra/controllers/user/create/create.user.contrller';
import { CreateOrganizationController } from './infra/controllers/organization/create/create.organization.contrller';
import { CreatePasswordResetTokenController } from './infra/controllers/password-reset-token/create/create.password.reset.token.contrller';

import { CreateUserService } from './domain/services/user/create/create.user.service';
import { CreateOrganizationService } from './domain/services/organization/create/create.organization.service';

import { UserRepository } from './domain/repositories/user/database/user.repository';
import { CreateOrganizationRepository } from './domain/repositories/organization/database/create.organization.repository';

import { DatabaseAdapter } from './infra/adapters/database/database.adapter';
import { HashProviderAdapter } from './infra/adapters/hash/hash.provider.adapter';
import { MailerAdapter } from './infra/adapters/mailer/mailer.adapter';
import { CreatePasswordResetTokenService } from './domain/services/password-reset-token/create.password.reset.token.service';
import { PasswordResetTokenRepository } from './domain/repositories/password-reset-token/database/password.reset.token.repository';
import { ResetPasswordController } from './infra/controllers/user/reset-password/reset.password.contrller';
import { ResetPasswordService } from './domain/services/user/reset-password/reset.password.service';



@Module({
  imports: [],
  controllers: [ 
    CreateOrganizationController, 
    CreateUserController, 
    CreatePasswordResetTokenController,
    ResetPasswordController
  ],
  providers: [
    { provide: 'DatabaseAdapterInterface', useClass: DatabaseAdapter},
    { provide: 'HashAdapterInterface', useClass: HashProviderAdapter},
    { provide: 'MailerAdapterInterface', useClass: MailerAdapter},
    
    CreateUserService,
    UserRepository,
    PasswordResetTokenRepository,

    CreateOrganizationService,
    CreateOrganizationRepository,
    CreatePasswordResetTokenService,
    ResetPasswordService,
  ],
})
export class AccountModule {}
