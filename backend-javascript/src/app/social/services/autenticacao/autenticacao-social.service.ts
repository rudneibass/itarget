import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arquivo } from '../../../admin/models/arquivo/arquivo.entity';
import { Organizacao } from '../../models/organizacao/organizacao.entity';
import { PermissaoUsuario } from '../../models/permissao-usuario/permissao-usuario.entity';
import { Usuario } from '../../models/usuario/usuario.entity';
import { AtividadeSocialService } from '../atividade/atividade-social.service';
import { DadosSessaoSocial, SessaoService } from '../sessao/sessao-social.service';

@Injectable()
export class AutenticacaoService {
  constructor(
    @InjectRepository(Organizacao)
    private readonly schoolRepository: Repository<Organizacao>,
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    @InjectRepository(PermissaoUsuario)
    private readonly permissionRepository: Repository<PermissaoUsuario>,
    @InjectRepository(Arquivo)
    private readonly arquivoRepository: Repository<Arquivo>,
    private readonly sessionService: SessaoService,
    private readonly activityService: AtividadeSocialService,
  ) {}

  private async resolveOrganizationLogoUrl(organizacaoId: number) {
    const logo = await this.arquivoRepository
      .createQueryBuilder('arquivo')
      .where('arquivo.entidadePai = :entidadePai', { entidadePai: 'organizacao' })
      .andWhere('arquivo.entidadePaiId = :entidadePaiId', { entidadePaiId: organizacaoId })
      .andWhere('LOWER(arquivo.tipo) LIKE :tipo', { tipo: 'image/%' })
      .orderBy('arquivo.id', 'DESC')
      .getOne();

    return logo?.url ?? null;
  }

  private async resolveUserAvatarUrl(usuarioId: number) {
    const avatar = await this.arquivoRepository
      .createQueryBuilder('arquivo')
      .where('arquivo.entidadePai = :entidadePai', { entidadePai: 'usuario' })
      .andWhere('arquivo.entidadePaiId = :entidadePaiId', { entidadePaiId: usuarioId })
      .andWhere('LOWER(arquivo.tipo) LIKE :tipo', { tipo: 'image/%' })
      .orderBy('arquivo.id', 'DESC')
      .getOne();

    return avatar?.url ?? null;
  }

  async authenticateByQr(organizacaoUuid: string, userHash: string): Promise<DadosSessaoSocial> {
    const school = await this.schoolRepository.findOne({ where: { uuid: organizacaoUuid, ativo: true } });
    if (!school) {
      throw new NotFoundException('Organizacao não encontrada ou inativa');
    }

    const user = await this.userRepository.findOne({
      where: {
        organizacaoId: school.id,
        hashQr: userHash,
        ativo: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('QRCode inválido para esta organizacao');
    }

    const permission = await this.permissionRepository.findOne({
      where: { usuarioId: user.id },
    });
    const logoUrl = await this.resolveOrganizationLogoUrl(school.id);
    const avatarUrl = await this.resolveUserAvatarUrl(user.id);

    const createdSession = this.sessionService.create({
      organizacaoUuid,
      organizacao: {
        nome: school.nome,
        logoUrl,
      },
      usuario: {
        uuid: user.uuid,
        nome: user.nome,
        apelido: user.apelido,
        urlAvatar: avatarUrl ?? user.urlAvatar,
        moedas: user.moedas,
        podePostarMidia: permission?.podePostarMidia ?? false,
        podePostarLink: permission?.podePostarLink ?? false,
      },
    });

    try {
      await this.activityService.registrarAtividade({
        organizacaoId: school.id,
        usuarioId: user.id,
        texto: 'Olá rede! Acabei de entrar na minha conta. Vamos interagir? 😊🚀',
        urlRedirecionamento: null,
        tituloRedirecionamento: null,
      });
    } catch {
      // A atividade não deve quebrar a autenticação.
    }

    return createdSession;
  }

  obterSessao(sessaoId: string) {
    return this.sessionService.get(sessaoId);
  }

  encerrarSessao(sessaoId: string): void {
    this.sessionService.delete(sessaoId);
  }
}
