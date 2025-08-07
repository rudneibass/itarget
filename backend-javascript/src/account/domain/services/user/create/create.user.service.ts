import { Injectable } from '@nestjs/common';
import { UserDto } from '../../../entities/user/user.dto';
import { User } from '../../../entities/user/user.entity';
import { CreateUserRepository } from '../../../repositories/user/database/create.user.repository';
import { CreateUserServiceInputDto } from './create.user.service.input.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly repository: CreateUserRepository) {}

  async execute(createUserDto: CreateUserServiceInputDto){
    const userDto = new UserDto({
      name: createUserDto.name,
      email: createUserDto.email,
    }); 

    const user = new User(userDto);
    const result = await this.repository.create(user);
    return result;
  }
}
