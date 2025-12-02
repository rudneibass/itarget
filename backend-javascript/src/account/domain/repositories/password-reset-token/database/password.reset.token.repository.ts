import { Inject, Injectable } from '@nestjs/common';
import { CreateRepository } from './create/create.repository';
import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import type { DatabaseAdapterInterface } from '@src/account/domain/interfaces/database.adapter.interface';
import { FindByUserIdRepository } from './find/find.by.user.id.repository';
import { UpdatePasswordResetTokenRepository } from './update/update.password.reset.token.repository';

@Injectable()
export class PasswordResetTokenRepository {

  private createRepository: CreateRepository
  private findByUserIdRepository: FindByUserIdRepository
  private updatePasswordResetTokenRepository: UpdatePasswordResetTokenRepository

  constructor(@Inject('DatabaseAdapterInterface') private readonly db: DatabaseAdapterInterface) {
    this.createRepository = new CreateRepository(this.db)
    this.findByUserIdRepository = new FindByUserIdRepository(this.db)
  }

  async create(passwordResetToken: PasswordResetToken): Promise<{ id: string }> {
    return this.createRepository.handle(passwordResetToken);
  }

  async findByUserId(userId: number): Promise<PasswordResetToken[]> {
    return this.findByUserIdRepository.handle(userId);
  }

  async update(passwordResetToken: PasswordResetToken): Promise<{ id: string }>{
    return this.updatePasswordResetTokenRepository.handle(passwordResetToken)
  }
}