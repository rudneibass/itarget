import { Module } from '@nestjs/common';

import { DatabaseAdapter } from './infra/adapters/database/database.adapter';
import { HashProviderAdapter } from './infra/adapters/hash/hash.provider.adapter';
import { MailerAdapter } from './infra/adapters/mailer/mailer.adapter';

import { UserRepository } from './domain/repositories/user/database/user.repository';
import { PasswordResetTokenRepository } from './domain/repositories/password-reset-token/database/password.reset.token.repository';

import { CreateUserService } from './domain/services/user/create/create.user.service';
import { CreateOrganizationService } from './domain/services/organization/create/create.organization.service';
import { CreatePasswordResetTokenService } from './domain/services/password-reset-token/create.password.reset.token.service';
import { ResetPasswordService } from './domain/services/user/reset-password/reset.password.service';

import { ResetPasswordController } from './infra/controllers/user/reset-password/reset.password.controller';
import { CreateUserController } from './infra/controllers/user/create/create.user.contrller';
import { ForgotPasswordController } from './infra/controllers/user/forgot-password/forgot-password.controller';
import { RecoverPasswordController } from './infra/controllers/user/recover-password/recover.password.controller';



@Module({
  imports: [],
  controllers: [ 
    CreateUserController, 
    ForgotPasswordController,
    RecoverPasswordController,
    ResetPasswordController
  ],
  providers: [
    { provide: 'DatabaseAdapterInterface', useClass: DatabaseAdapter},
    { provide: 'HashAdapterInterface', useClass: HashProviderAdapter},
    { provide: 'MailerAdapterInterface', useClass: MailerAdapter},
    
    UserRepository,
    PasswordResetTokenRepository,

    CreateUserService,
    ResetPasswordService,
    CreateOrganizationService,
    CreatePasswordResetTokenService,
  ],
})
export class AccountModule {}
