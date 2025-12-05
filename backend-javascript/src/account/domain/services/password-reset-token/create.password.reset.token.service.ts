import { Inject, Injectable } from '@nestjs/common';
import type { HashAdapterInterface } from '@src/account/domain/interfaces/hash.adapter.interface';
import type { MailerAdapterInterface } from '@src/account/domain/interfaces/mailer.adapter.interface';
import { DomainException } from '@src/account/infra/exceptions/domain.exception';
import { randomBytes } from 'crypto';

import { PasswordResetTokenDto } from '@src/account/domain/entities/password-reset-token/password.reset.token.dto';
import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import { PasswordResetTokenRepository } from '@src/account/domain/repositories/password-reset-token/database/password.reset.token.repository';
import { UserRepository } from '@src/account/domain/repositories/user/database/user.repository';
import { CreatePasswordResetTokenInputDto } from './create.password.reset.token.input.dto';

@Injectable()
export class CreatePasswordResetTokenService {

  constructor(
    private readonly repository: PasswordResetTokenRepository,
    private readonly userRepository: UserRepository,
    @Inject('HashAdapterInterface') private readonly hashAdapter: HashAdapterInterface,
    @Inject('MailerAdapterInterface') private readonly mailerAdapter: MailerAdapterInterface
  ) {}

  async execute(input: CreatePasswordResetTokenInputDto){
    const user = await this.userRepository.getByEmail(input.email)
    if (!user || !user.getId()){
      throw new DomainException('Usuário não encontrado', 422);
    }

    const token = randomBytes(32).toString('hex');
    const hashToken = await this.hashAdapter.hash(token)
    const urlToResetPassword = `http://localhost:3000/api/user/recover-password?token=${hashToken}`
    const userId = user.getId();
    if (!userId) {
      throw new DomainException('Usuário sem ID válido', 422);
    }

    const passwordResetToken = await 
    this.repository.create(
      new PasswordResetToken(
        new PasswordResetTokenDto({
        userId,
        hashToken: hashToken,
        expiresAt: new Date(Date.now() + 3600 * 1000).toString(),
      }))
    )

    this.sendPasswordResetTokenEmail({email: user.getEmail(), name: user.getName(), urlToResetPassword: urlToResetPassword });
    return { 
      success: true,
      resetUrl: 'Enviamos uma url para redefinição de senha para seu email.' 
    };
  }


  sendPasswordResetTokenEmail({email, name, urlToResetPassword} : {email: string, name: string, urlToResetPassword: string}) {
    this.mailerAdapter.send({
      to: email,
      subject: 'Bem-vindo!',
      html: 
        `<h1>Olá, ${name}</h1>
        <p>Clique no link abaixo para redefinir sua senha!</p>
        <p><a href="${urlToResetPassword}">${urlToResetPassword}</p>
        `,
    });
  }
}
