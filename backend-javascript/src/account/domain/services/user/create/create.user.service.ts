import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '@src/account/domain/entities/user/user.dto';
import { User } from '@src/account/domain/entities/user/user.entity';
import { CreateUserServiceInputDto } from '@src/account/domain/services/user/create/create.user.service.input.dto';
import type { HashAdapterInterface } from '@src/account/domain/interfaces/hash.adapter.interface';
import type { MailerAdapterInterface } from '@src/account/domain/interfaces/mailer.adapter.interface';
import { UserRepository } from '@src/account/domain/repositories/user/database/user.repository';
import { DomainException } from '@src/account/infra/exceptions/domain.exception';
@Injectable()
export class CreateUserService {
  private serviceName = 'criação de usuários'

  constructor(
    private readonly repository: UserRepository,
    @Inject('HashAdapterInterface') private readonly hashProvider: HashAdapterInterface,
    @Inject('MailerAdapterInterface') private readonly mailerAdapter: MailerAdapterInterface
  ) {}

  async execute(createUserDto: CreateUserServiceInputDto){
    const uniqueEmail = await this.validadeUniqueEmail(createUserDto.email)
    const userId = await this.persist(createUserDto)
    const user = await this.getById(userId)
    if(user){ this.sendWelcomeEmail(user.getEmail(), user.getName()) }
    return userId;
  }

  async persist(createUserDto: CreateUserServiceInputDto){
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

  async getById({id}){
    const user = await this.repository.get(id)
    return user
  }

  async validadeUniqueEmail(email: string){
    const user = await this.repository.getByEmail(email)
    if(user){
      throw new DomainException(`Serviço de ${this.serviceName}: Email já cadastrado outro usuário`, 422)
    }
    return null
  }

  sendWelcomeEmail(email: string, name: string) {
    this.mailerAdapter.send({
      to: email,
      subject: 'Bem-vindo!',
      html: `<h1>Olá, ${name}</h1><p>Seu cadastro foi realizado com sucesso!</p>`,
    });
  }
}
