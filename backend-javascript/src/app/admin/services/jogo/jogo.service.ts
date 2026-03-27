import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { Jogo } from '../../../social/models/jogo/jogo.entity';
import { OrganizacaoService } from '../organizacao/organizacao.service';

@Injectable()
export class JogoService {
  constructor(
    @InjectRepository(Jogo)
    private readonly jogoRepository: Repository<Jogo>,
    private readonly organizacaoService: OrganizacaoService,
  ) {}

  async findAll() {
    return this.jogoRepository.find({ order: { id: 'DESC' } });
  }

  async get(uuid: string) {
    const jogo = await this.jogoRepository.findOne({ where: { uuid } });
    if (!jogo) {
      throw new NotFoundException('Jogo não encontrado');
    }

    return jogo;
  }

  async create(ownerUuid: string, payload: Partial<Jogo>) {
    const organizacaoUuid = await this.organizacaoService.getOwnedOrganizationUuid(ownerUuid);
    if (!organizacaoUuid) {
      throw new BadRequestException('Você precisa criar uma organização antes de cadastrar um jogo.');
    }
    const jogo = this.jogoRepository.create({
      uuid: randomUUID(),
      organizacaoUuid,
      nome: payload.nome,
      descricao: payload.descricao || null,
      url: payload.url,
      custoMoedas: Number(payload.custoMoedas || 0),
      ativo: true,
    });
    return this.jogoRepository.save(jogo);
  }

  async update(uuid: string, payload: Partial<Jogo>) {
    const jogo = await this.get(uuid);
    jogo.nome = payload.nome ?? jogo.nome;
    jogo.descricao = payload.descricao ?? jogo.descricao;
    jogo.url = payload.url ?? jogo.url;
    jogo.custoMoedas = payload.custoMoedas !== undefined ? Number(payload.custoMoedas) : jogo.custoMoedas;
    return this.jogoRepository.save(jogo);
  }

  async remove(uuid: string) {
    const jogo = await this.get(uuid);
    await this.jogoRepository.remove(jogo);
  }
}
