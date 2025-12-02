import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@src/account/domain/repositories/user/database/user.repository';
import { ResetPasswordInputDto } from './reset.password.input.dto';
import { PasswordResetTokenRepository } from '@src/account/domain/repositories/password-reset-token/database/password.reset.token.repository';
import { DomainException } from '@src/account/infra/exceptions/domain.exception';
import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import type { HashAdapterInterface } from '@src/account/domain/interfaces/hash.adapter.interface';
import type { MailerAdapterInterface } from '@src/account/domain/interfaces/mailer.adapter.interface';

@Injectable()
export class ResetPasswordService {

  constructor(
    private readonly repository: UserRepository,
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
    @Inject('HashAdapterInterface') private readonly hashProvider: HashAdapterInterface,
    @Inject('MailerAdapterInterface') private readonly mailerAdapter: MailerAdapterInterface
  ) {}

  async execute(input: ResetPasswordInputDto){
    const user = await this.repository.getByEmail(input.email)
    if(!user){
      throw new DomainException('Usuário não encontrado', 422);
    }
    const userId = user.getId()
    if(!userId){
      throw new DomainException('Usuário não encontrado', 422);
    }
    const passwordResetTokens = await this.passwordResetTokenRepository.findByUserId(userId);
    let matchedPasswordResetToken: PasswordResetToken | null = null;
    for (const passwordResetToken of passwordResetTokens) {
      const match = await this.hashProvider.compare(input.token, passwordResetToken.getTokenHash());
      if (match) {
        matchedPasswordResetToken = passwordResetToken;
        break;
      }
    }
    if (!matchedPasswordResetToken) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    
    const hashedPassword = await this.hashProvider.hash(input.newPassword);
    user.updatePasswordHash(hashedPassword)
    await this.repository.update(user);


    matchedPasswordResetToken.updateUsed(true)
    await this.passwordResetTokenRepository.update(matchedPasswordResetToken);


    return { message: 'Senha atualizada com sucesso' };
  }


}
