import { Inject, Injectable } from '@nestjs/common';
import { CreateRepository } from './create/create.repository';
import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import type { DatabaseAdapterInterface } from '@src/account/domain/interfaces/database.adapter.interface';
import { UpdatePasswordResetTokenRepository } from './update/update.password.reset.token.repository';
import { GetByHashTokenRepository } from './get/get.by.hash.token.repository';


@Injectable()
export class PasswordResetTokenRepository {

  private createRepository: CreateRepository
  private updateRepository: UpdatePasswordResetTokenRepository
  private getByHashTokenRepository: GetByHashTokenRepository

  constructor(@Inject('DatabaseAdapterInterface') private readonly db: DatabaseAdapterInterface) {
    this.createRepository = new CreateRepository(this.db)
    this.updateRepository = new UpdatePasswordResetTokenRepository(this.db)
    this.getByHashTokenRepository = new GetByHashTokenRepository(this.db)
  }

  async create(passwordResetToken: PasswordResetToken): Promise<number> {
    return this.createRepository.handle(passwordResetToken);
  }

  async getByHashToken(hashToken: string): Promise<PasswordResetToken | null> {
    return this.getByHashTokenRepository.handle(hashToken);
  }

  async update(passwordResetToken: PasswordResetToken): Promise<number>{
    return this.updateRepository.handle(passwordResetToken)
  }
}