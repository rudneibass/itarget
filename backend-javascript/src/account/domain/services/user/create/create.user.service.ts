import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '@src/account/domain/entities/user/user.dto';
import { User } from '@src/account/domain/entities/user/user.entity';
import { CreateUserRepository } from '@src/account/domain/repositories/user/database/create.user.repository';
import { CreateUserServiceInputDto } from '@src/account/domain/services/user/create/create.user.service.input.dto';
import type { HashProviderInterface } from '@src/account/domain/interfaces/hash.provider.interface';
@Injectable()
export class CreateUserService {
  constructor(
    private readonly repository: CreateUserRepository,
    @Inject('HashProviderInterface') private readonly hashProvider: HashProviderInterface,
  ) {}

  async execute(createUserDto: CreateUserServiceInputDto){
    const passwordHash = await this.hashProvider.hash(createUserDto.password)
    const userDto = new UserDto({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash: passwordHash
    }); 

    const user = new User(userDto);
    const result = await this.repository.create(user);
    return result;
  }
}
