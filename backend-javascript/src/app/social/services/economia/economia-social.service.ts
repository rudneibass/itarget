import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arquivo } from '../../../admin/models/arquivo/arquivo.entity';
import { AcessoJogo } from '../../models/acesso-jogo/acesso-jogo.entity';
import { Jogo } from '../../models/jogo/jogo.entity';
import { PermissaoUsuario } from '../../models/permissao-usuario/permissao-usuario.entity';
import { Usuario } from '../../models/usuario/usuario.entity';
import { AtualizarPermissaoUsuarioDto } from '../../dtos/admin/atualizar-permissao-usuario.dto';
import { AtividadeSocialService } from '../atividade/atividade-social.service';
import { DadosSessaoSocial, SessaoService } from '../sessao/sessao-social.service';

@Injectable()
export class EconomiaService {
  constructor(
    @InjectRepository(Jogo)
    private readonly gameRepository: Repository<Jogo>,
    @InjectRepository(AcessoJogo)
    private readonly gameAccessRepository: Repository<AcessoJogo>,
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    @InjectRepository(PermissaoUsuario)
    private readonly permissionRepository: Repository<PermissaoUsuario>,
    @InjectRepository(Arquivo)
    private readonly arquivoRepository: Repository<Arquivo>,
    private readonly sessionService: SessaoService,
    private readonly activityService: AtividadeSocialService,
  ) {}

  private async resolveGameCoverUrl(jogoId: number) {
    const image = await this.arquivoRepository
      .createQueryBuilder('arquivo')
      .where('arquivo.entidadePai = :entidadePai', { entidadePai: 'jogo' })
      .andWhere('arquivo.entidadePaiId = :entidadePaiId', { entidadePaiId: jogoId })
      .andWhere('LOWER(arquivo.tipo) LIKE :tipo', { tipo: 'image/%' })
      .orderBy('arquivo.id', 'DESC')
      .getOne();

    return image?.url ?? null;
  }

  async listarJogos(organizacaoUuid: string) {
    const organizacao = await this.userRepository.query('SELECT id FROM public.organizacao WHERE uuid = $1', [organizacaoUuid]);
    if (!organizacao?.[0]?.id) {
      return [];
    }

    const games = await this.gameRepository.find({
      where: { organizacaoId: Number(organizacao[0].id), ativo: true },
      order: { criadoEm: 'DESC' },
    });

    if (games.length === 0) {
      return [];
    }

    const gamesWithCover = await Promise.all(
      games.map(async (game) => ({
        ...game,
        gameImageUrl: await this.resolveGameCoverUrl(game.id),
      })),
    );

    return gamesWithCover;
  }

  async liberarJogo(session: DadosSessaoSocial, jogoUuid: string) {
    const user = await this.userRepository.findOne({ where: { uuid: session.usuario.uuid } });
    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }

    const game = await this.gameRepository.findOne({
      where: { uuid: jogoUuid, organizacaoId: user.organizacaoId, ativo: true },
    });

    if (!game) {
      throw new NotFoundException('Jogo não encontrado');
    }

    const jaLiberado = await this.gameAccessRepository.findOne({
      where: { jogoId: game.id, usuarioId: user.id },
    });

    if (jaLiberado) {
      return { liberado: true, jaLiberado: true };
    }

    if (user.moedas < game.custoMoedas) {
      throw new ForbiddenException('Moedas insuficientes para liberar este jogo');
    }

    user.moedas -= game.custoMoedas;
    await this.userRepository.save(user);
    this.sessionService.atualizarMoedas(session.sessaoId, user.moedas);

    await this.gameAccessRepository.save(
      this.gameAccessRepository.create({
        jogoId: game.id,
        usuarioId: user.id,
        custoMoedas: game.custoMoedas,
      }),
    );

    try {
      await this.activityService.registrarAtividade({
        organizacaoId: user.organizacaoId,
        usuarioId: user.id,
        texto: `desbloqueou o jogo ${game.nome}`,
        urlRedirecionamento: null,
        tituloRedirecionamento: null,
      });
    } catch {
      // A atividade não deve quebrar o desbloqueio do jogo.
    }

    return { liberado: true, moedasTotais: user.moedas };
  }

  async updateUserPermission(usuarioUuid: string, dto: AtualizarPermissaoUsuarioDto) {
    const user = await this.userRepository.findOne({ where: { uuid: usuarioUuid } });
    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }

    const currentPermission = await this.permissionRepository.findOne({ where: { usuarioId: user.id } });
    if (!currentPermission) {
      return this.permissionRepository.save(
        this.permissionRepository.create({
          usuarioId: user.id,
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
    const organizacao = await this.userRepository.query('SELECT id FROM public.organizacao WHERE uuid = $1', [organizacaoUuid]);
    if (!organizacao?.[0]?.id) {
      return [];
    }

    return this.userRepository.find({ where: { organizacaoId: Number(organizacao[0].id), ativo: true }, order: { nome: 'ASC' } });
  }
}
