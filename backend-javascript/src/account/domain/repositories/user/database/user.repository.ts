import { Inject, Injectable } from '@nestjs/common';
import type { DatabaseAdapterInterface } from '@src/account/domain/interfaces/database.adapter.interface';
import { User } from '@src/account/domain/entities/user/user.entity';
import { CreateUserRepository } from './create/create.user.repository';
import { GetByIdRepository } from './get/get.by.id.repository';
import { GetByEmailRepository } from './get/get.by.email.repository'

@Injectable()
export class UserRepository {
  private createUserRepository: CreateUserRepository
  private getByIdRepository: GetByIdRepository
  private getByEmailRepository: GetByEmailRepository

  constructor(@Inject('DatabaseAdapterInterface') private readonly db: DatabaseAdapterInterface) {
    this.createUserRepository = new CreateUserRepository(this.db)
    this.getByIdRepository = new GetByIdRepository(this.db)
    this.getByEmailRepository = new GetByEmailRepository(this.db)
  }

  async create(user: User): Promise<{ id: string }> {
    return this.createUserRepository.handle(user);
  }

  async get(id: string): Promise<User | null> {
    return this.getByIdRepository.handle(id);
  }
  
  async getByEmail(email: string): Promise<User | null>{
    return this.getByEmailRepository.handle(email)
  }
}