import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcessoJogo } from '../../models/acesso-jogo/acesso-jogo.entity';
import { Jogo } from '../../models/jogo/jogo.entity';
import { ResgateRecompensa } from '../../models/resgate-recompensa/resgate-recompensa.entity';
import { Recompensa } from '../../models/recompensa/recompensa.entity';
import { PermissaoUsuario } from '../../models/permissao-usuario/permissao-usuario.entity';
import { Usuario } from '../../models/usuario/usuario.entity';
import { SalvarRecompensaDto } from '../../dtos/admin/salvar-recompensa.dto';
import { AtualizarPermissaoUsuarioDto } from '../../dtos/admin/atualizar-permissao-usuario.dto';
import { randomUUID } from 'node:crypto';
import { DadosSessaoSocial, SessaoService } from '../sessao/sessao-social.service';

@Injectable()
export class EconomiaService {
  constructor(
    @InjectRepository(Jogo)
    private readonly gameRepository: Repository<Jogo>,
    @InjectRepository(AcessoJogo)
    private readonly gameAccessRepository: Repository<AcessoJogo>,
    @InjectRepository(Recompensa)
    private readonly rewardRepository: Repository<Recompensa>,
    @InjectRepository(ResgateRecompensa)
    private readonly redemptionRepository: Repository<ResgateRecompensa>,
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    @InjectRepository(PermissaoUsuario)
    private readonly permissionRepository: Repository<PermissaoUsuario>,
    private readonly sessionService: SessaoService,
  ) {}

  async listarJogos(organizacaoUuid: string) {
    return this.gameRepository.find({
      where: { organizacaoUuid, ativo: true },
      order: { criadoEm: 'DESC' },
    });
  }

  async liberarJogo(session: DadosSessaoSocial, jogoUuid: string) {
    const game = await this.gameRepository.findOne({
      where: { uuid: jogoUuid, organizacaoUuid: session.organizacaoUuid, ativo: true },
    });

    if (!game) {
      throw new NotFoundException('Jogo não encontrado');
    }

    const jaLiberado = await this.gameAccessRepository.findOne({
      where: { jogoUuid, usuarioUuid: session.usuario.uuid },
    });

    if (jaLiberado) {
      return { liberado: true, jaLiberado: true };
    }

    const user = await this.userRepository.findOne({ where: { uuid: session.usuario.uuid } });
    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }

    if (user.moedas < game.custoMoedas) {
      throw new ForbiddenException('Moedas insuficientes para liberar este jogo');
    }

    user.moedas -= game.custoMoedas;
    await this.userRepository.save(user);
    this.sessionService.atualizarMoedas(session.sessaoId, user.moedas);

    await this.gameAccessRepository.save(
      this.gameAccessRepository.create({
        jogoUuid,
        usuarioUuid: user.uuid,
        custoMoedas: game.custoMoedas,
      }),
    );

    return { liberado: true, moedasTotais: user.moedas };
  }

  async listarRecompensas(organizacaoUuid: string) {
    return this.rewardRepository.find({
      where: { organizacaoUuid, ativo: true },
      order: { criadoEm: 'DESC' },
    });
  }

  async resgatarRecompensa(session: DadosSessaoSocial, recompensaUuid: string) {
    const reward = await this.rewardRepository.findOne({
      where: { uuid: recompensaUuid, organizacaoUuid: session.organizacaoUuid, ativo: true },
    });

    if (!reward) {
      throw new NotFoundException('Recompensa não encontrada');
    }

    const user = await this.userRepository.findOne({ where: { uuid: session.usuario.uuid } });
    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }

    if (user.moedas < reward.custoMoedas) {
      throw new ForbiddenException('Moedas insuficientes para resgatar recompensa');
    }

    user.moedas -= reward.custoMoedas;
    await this.userRepository.save(user);
    this.sessionService.atualizarMoedas(session.sessaoId, user.moedas);

    const redemption = await this.redemptionRepository.save(
      this.redemptionRepository.create({
        recompensaUuid,
        usuarioUuid: user.uuid,
        custoMoedas: reward.custoMoedas,
        status: 'pendente',
      }),
    );

    return {
      redemption,
      moedasTotais: user.moedas,
    };
  }

  async upsertReward(organizacaoUuid: string, dto: SalvarRecompensaDto) {
    const reward = this.rewardRepository.create({
      uuid: randomUUID(),
      organizacaoUuid,
      titulo: dto.titulo,
      descricao: dto.descricao,
      tipo: dto.tipo,
      custoMoedas: dto.custoMoedas,
      ativo: dto.ativo ?? true,
    });

    return this.rewardRepository.save(reward);
  }

  async toggleReward(recompensaUuid: string, ativo: boolean) {
    const reward = await this.rewardRepository.findOne({ where: { uuid: recompensaUuid } });
    if (!reward) {
      throw new NotFoundException('Recompensa não encontrada');
    }

    reward.ativo = ativo;
    return this.rewardRepository.save(reward);
  }

  async updateUserPermission(usuarioUuid: string, dto: AtualizarPermissaoUsuarioDto) {
    const user = await this.userRepository.findOne({ where: { uuid: usuarioUuid } });
    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }

    const currentPermission = await this.permissionRepository.findOne({ where: { usuarioUuid } });
    if (!currentPermission) {
      return this.permissionRepository.save(
        this.permissionRepository.create({
          usuarioUuid,
          podePostarMidia: dto.podePostarMidia,
          podePostarLink: dto.podePostarLink,
        }),
      );
    }

    currentPermission.podePostarMidia = dto.podePostarMidia;
    currentPermission.podePostarLink = dto.podePostarLink;
    return this.permissionRepository.save(currentPermission);
  }

  async listUsersByOrganization(organizacaoUuid: string) {
    return this.userRepository.find({ where: { organizacaoUuid, ativo: true }, order: { nome: 'ASC' } });
  }
}
