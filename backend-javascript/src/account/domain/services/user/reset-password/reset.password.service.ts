import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@src/account/domain/repositories/user/database/user.repository';
import { ResetPasswordInputDto } from './reset.password.input.dto';
import { PasswordResetTokenRepository } from '@src/account/domain/repositories/password-reset-token/database/password.reset.token.repository';
import { DomainException } from '@src/account/infra/exceptions/domain.exception';
import type { HashAdapterInterface } from '@src/account/domain/interfaces/hash.adapter.interface';
import type { DatabaseAdapterInterface } from '@src/account/domain/interfaces/database.adapter.interface';

@Injectable()
export class ResetPasswordService {

  constructor(
    private readonly repository: UserRepository,
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
    @Inject('HashAdapterInterface') private readonly hashProvider: HashAdapterInterface,
    @Inject('DatabaseAdapterInterface') private readonly db: DatabaseAdapterInterface
  ) {}

  async execute(input: ResetPasswordInputDto){
    this.db.beginTransaction()
    try {
      const passwordResetToken = await this.passwordResetTokenRepository.getByHashToken(input.token)
      if(!passwordResetToken){
        throw new DomainException('Token inválido ou expirado', 422);
      }

      const user = await this.repository.getById(passwordResetToken.getUserId())
      if(!user){
        throw new DomainException('Usuário não encontrado', 422);
      }

      const hashedPassword = await this.hashProvider.hash(input.newPassword);

      user.updatePasswordHash(hashedPassword)
      await this.repository.update(user);

      passwordResetToken.updateUsed(true)
      await this.passwordResetTokenRepository.update(passwordResetToken);

      this.db.commit()
      return { 
        success: true,
        message: 'Senha atualizada com sucesso' 
      };  
    } catch (error) {
      this.db.rollback()
      return { 
        success: false,
        message: `Erro ao tentar redefinir a senha, tente mais tarde:`,
        error: `${error}`
      };  
    }
  }
}
