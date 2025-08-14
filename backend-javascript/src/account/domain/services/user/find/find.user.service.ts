import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@src/account/domain/entities/user/user.entity';
import { FindUserRepository } from '@src/account/domain/repositories/user/database/find.user.repository';
import { FindUserServiceInputDto } from '@src/account/domain/services/user/find/find.user.service.input.dto';
import { FindUserServiceOutputDto } from './find.user.service.output.dto';

@Injectable()
export class FindUserService {
  constructor(private readonly repository: FindUserRepository) {}

  async execute(findUserDto: FindUserServiceInputDto): Promise<Array<FindUserServiceOutputDto> | null> {
    const user = await this.repository.findById(findUserDto.id);

    if (!user) { return null }

    return new Array(
      new FindUserServiceOutputDto({
        name: user.getName(),
        email: user.getEmail(),
      })
    )
  }
} 