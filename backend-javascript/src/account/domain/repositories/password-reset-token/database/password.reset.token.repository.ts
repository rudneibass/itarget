import { Inject, Injectable } from '@nestjs/common';
import { CreateRepository } from './create/create.repository';
import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import type { DatabaseAdapterInterface } from '@src/account/domain/interfaces/database.adapter.interface';

@Injectable()
export class PasswordResetTokenRepository {

  private createRepository: CreateRepository

  constructor(@Inject('DatabaseAdapterInterface') private readonly db: DatabaseAdapterInterface) {
    this.createRepository = new CreateRepository(this.db)
  }

  async create(passwordResetToken: PasswordResetToken): Promise<{ id: string }> {
    return this.createRepository.handle(passwordResetToken);
  }
}