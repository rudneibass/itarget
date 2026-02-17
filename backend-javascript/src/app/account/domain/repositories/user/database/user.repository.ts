import { Inject, Injectable } from '@nestjs/common';
import type { DatabaseAdapterInterface } from '@src/account/domain/interfaces/database.adapter.interface';
import { User } from '@src/account/domain/entities/user/user.entity';
import { CreateUserRepository } from './create/create.user.repository';
import { GetByIdRepository } from './get/get.by.id.repository';
import { GetByEmailRepository } from './get/get.by.email.repository'
import { FindByEmailRepository } from './find/find.by.email.repository';
import { UpdateUserRepository } from './update/update.user.repository';
import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import { UpdateUserPasswordRepository } from './update/update.user.password.repository';

@Injectable()
export class UserRepository {
  private createUserRepository: CreateUserRepository
  private getByIdRepository: GetByIdRepository
  private getByEmailRepository: GetByEmailRepository
  private findByEmailRepository: FindByEmailRepository
  private updateUserRepository: UpdateUserRepository
  private updateUserPasswordRepository: UpdateUserPasswordRepository

  constructor(@Inject('DatabaseAdapterInterface') private readonly db: DatabaseAdapterInterface) {
    this.createUserRepository = new CreateUserRepository(this.db)
    this.getByIdRepository = new GetByIdRepository(this.db)
    this.getByEmailRepository = new GetByEmailRepository(this.db)
    this.findByEmailRepository = new FindByEmailRepository(this.db)
    this.updateUserRepository = new UpdateUserRepository(this.db)
    this.updateUserPasswordRepository = new UpdateUserPasswordRepository(this.db)
  }

  async create(user: User): Promise<number> {
    return this.createUserRepository.handle(user);
  }

  async getById(id: number): Promise<User | null> {
    return this.getByIdRepository.handle(id);
  }
  
  async getByEmail(email: string): Promise<User | null>{
    return this.getByEmailRepository.handle(email)
  }

  async findByEmail(email: string): Promise<User[]>{
    return this.findByEmailRepository.handle(email)
  }

  async update(user: User): Promise<number> {
    return this.updateUserRepository.handle(user)
  }

  async updateUserPassword(user: User, passwordResetToken: PasswordResetToken): Promise<number | null>{
    return this.updateUserPasswordRepository.handle(user, passwordResetToken)
  }
}