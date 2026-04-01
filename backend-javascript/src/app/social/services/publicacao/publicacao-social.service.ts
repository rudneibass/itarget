import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { In, Repository } from 'typeorm';
import { Arquivo } from '../../../admin/models/arquivo/arquivo.entity';
import { CriarComentarioDto } from '../../dtos/publicacao/criar-comentario.dto';
import { CriarPublicacaoDto } from '../../dtos/publicacao/criar-publicacao.dto';
import { ComentarioPublicacao } from '../../models/comentario-publicacao/comentario-publicacao.entity';
import { CurtidaPublicacao } from '../../models/curtida-publicacao/curtida-publicacao.entity';
import { CompartilhamentoPublicacao } from '../../models/compartilhamento-publicacao/compartilhamento-publicacao.entity';
import { Publicacao } from '../../models/publicacao/publicacao.entity';
import { Usuario } from '../../models/usuario/usuario.entity';
import { AtividadeSocialService } from '../atividade/atividade-social.service';
import { DadosSessaoSocial } from '../sessao/sessao-social.service';

@Injectable()
export class PublicacaoService {
  constructor(
    @InjectRepository(Publicacao)
    private readonly postRepository: Repository<Publicacao>,
    @InjectRepository(ComentarioPublicacao)
    private readonly commentRepository: Repository<ComentarioPublicacao>,
    @InjectRepository(CurtidaPublicacao)
    private readonly likeRepository: Repository<CurtidaPublicacao>,
    @InjectRepository(CompartilhamentoPublicacao)
    private readonly compartilharRepository: Repository<CompartilhamentoPublicacao>,
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    @InjectRepository(Arquivo)
    private readonly arquivoRepository: Repository<Arquivo>,
    private readonly activityService: AtividadeSocialService,
  ) {}

  private async logActivitySafe(input: {
    organizacaoId: number;
    usuarioId: number;
    texto: string;
    urlRedirecionamento?: string | null;
    tituloRedirecionamento?: string | null;
  }) {
    try {
      await this.activityService.registrarAtividade(input);
    } catch {
      // A atividade não pode quebrar a ação principal da rede social.
    }
  }

  private async resolveUserAvatarUrls(userIds: number[]) {
    if (userIds.length === 0) {
      return new Map<number, string>();
    }

    const avatars = await this.arquivoRepository
      .createQueryBuilder('arquivo')
      .where('arquivo.entidadePai = :entidadePai', { entidadePai: 'usuario' })
      .andWhere('arquivo.entidadePaiId IN (:...userIds)', { userIds })
      .andWhere('LOWER(arquivo.tipo) LIKE :tipo', { tipo: 'image/%' })
      .orderBy('arquivo.entidadePaiId', 'ASC')
      .addOrderBy('arquivo.id', 'DESC')
      .getMany();

    const avatarByUserId = new Map<number, string>();
    for (const avatar of avatars) {
      if (!avatarByUserId.has(avatar.entidadePaiId)) {
        avatarByUserId.set(avatar.entidadePaiId, avatar.url);
      }
    }

    return avatarByUserId;
  }

  private normalizeInstagramUrl(url?: string | null) {
    if (!url) {
      return null;
    }

    try {
      const parsed = new URL(url);
      if (!parsed.hostname.toLowerCase().includes('instagram.com')) {
        return null;
      }

      const pathname = parsed.pathname.endsWith('/') ? parsed.pathname : `${parsed.pathname}/`;
      return `${parsed.protocol}//${parsed.hostname}${pathname}`;
    } catch {
      return null;
    }
  }

  private buildInstagramEmbedUrl(url?: string | null) {
    const normalizedUrl = this.normalizeInstagramUrl(url);
    if (!normalizedUrl) {
      return null;
    }

    return normalizedUrl.endsWith('/embed/')
      ? normalizedUrl
      : `${normalizedUrl}embed/`;
  }

  async listTimeline(organizacaoUuid: string, usuarioUuid?: string) {
    const organizacao = await this.userRepository.query('SELECT id FROM public.organizacao WHERE uuid = $1', [organizacaoUuid]);
    if (!organizacao?.[0]?.id) {
      return [];
    }

    const currentUser = usuarioUuid ? await this.userRepository.findOne({ where: { uuid: usuarioUuid } }) : null;

    const posts = await this.postRepository.find({
      where: { organizacaoId: Number(organizacao[0].id) },
      order: { criadoEm: 'DESC' },
      take: 50,
    });

    if (posts.length === 0) {
      return [];
    }

    const authorIds = Array.from(new Set(posts.map((post) => post.usuarioId)));
    const authors = await this.userRepository.find({
      where: { id: In(authorIds) },
      select: {
        id: true,
        uuid: true,
        nome: true,
        apelido: true,
        urlAvatar: true,
      },
    });
    const authorAvatarById = await this.resolveUserAvatarUrls(authorIds);
    const authorById = new Map(authors.map((author) => [author.id, author]));

    const postIds = posts.map((post) => post.id);
    const userLikes = currentUser
      ? await this.likeRepository.find({
          where: {
            usuarioId: currentUser.id,
            publicacaoId: In(postIds),
          },
          select: {
            publicacaoId: true,
          },
        })
      : [];
    const likedPostIds = new Set(userLikes.map((like) => like.publicacaoId));

    const withCounters = await Promise.all(
      posts.map(async (post, index) => {
        const postAuthor = authorById.get(post.usuarioId);
        const authorName = postAuthor?.apelido || postAuthor?.nome || 'Usuário';
        const instagramSourceUrl = this.normalizeInstagramUrl(post.urlRedirecionamento || post.midiaUrl);
        const isInstagram = post.tipo === 'instagram' || Boolean(instagramSourceUrl);
        const instagramEmbedUrl = isInstagram ? this.buildInstagramEmbedUrl(post.urlRedirecionamento || post.midiaUrl) : null;
        const isTextHighlight = !post.midiaUrl && !isInstagram && (post.tipo === 'texto' || post.tipo === 'emoji' || post.tipo === 'atividade');
        const [likes, comments, compartilhars] = await Promise.all([
          this.likeRepository.count({ where: { publicacaoId: post.id } }),
          this.commentRepository.count({ where: { publicacaoId: post.id } }),
          this.compartilharRepository.count({ where: { publicacaoId: post.id } }),
        ]);

        return {
          ...post,
          authorName,
          authorAvatarUrl: authorAvatarById.get(post.usuarioId) ?? postAuthor?.urlAvatar ?? null,
          authorInitial: authorName.charAt(0).toUpperCase(),
          isOwnPost: currentUser ? post.usuarioId === currentUser.id : false,
          isAtividade: post.tipo === 'atividade',
          isInstagram,
          instagramEmbedUrl,
          isVideo: post.tipo === 'video',
          isTextHighlight,
          textHighlightVariant: isTextHighlight ? (index % 3) + 1 : null,
          tempoRelativo: this.tempoRelativo(post.criadoEm),
          likedByCurrentUser: likedPostIds.has(post.id),
          likes,
          comments,
          compartilhars,
        };
      }),
    );

    return withCounters;
  }

  async listShortsTimeline(organizacaoUuid: string, usuarioUuid?: string) {
    const timeline = await this.listTimeline(organizacaoUuid, usuarioUuid);
    const timelineOrderedByUuid = [...timeline].sort((a, b) => String(a.uuid || '').localeCompare(String(b.uuid || '')));
    const filtered = timelineOrderedByUuid.filter((post) => post.tipo !== 'atividade');

    const destaqueQueue = filtered.filter((p) => p.destaque);
    const internoQueue = filtered.filter((p) => !p.destaque && (p.conteudo || '').toUpperCase() === 'INTERNO');
    const anuncianteQueue = filtered.filter((p) => !p.destaque && (p.conteudo || '').toUpperCase() === 'ANUNCIANTE');
    const externoQueue = filtered.filter((p) => !p.destaque && (p.conteudo || '').toUpperCase() === 'EXTERNO');

    // Intercala na ordem: destaque → INTERNO → ANUNCIANTE → EXTERNO x5 → (repete).
    const queues = [destaqueQueue, internoQueue, anuncianteQueue, externoQueue, externoQueue, externoQueue, externoQueue, externoQueue];
    const result: typeof filtered = [];

    while (queues.some((q) => q.length > 0)) {
      for (const queue of queues) {
        if (queue.length > 0) {
          result.push(queue.shift()!);
        }
      }
    }

    return result;
  }

  private tempoRelativo(date: Date): string {
    const diffMs = Date.now() - new Date(date).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffH = Math.floor(diffMin / 60);
    const diffD = Math.floor(diffH / 24);
    const diffW = Math.floor(diffD / 7);
    const diffM = Math.floor(diffD / 30);
    const diffY = Math.floor(diffD / 365);
    if (diffSec < 60) return 'agora mesmo';
    if (diffMin < 60) return `há ${diffMin} ${diffMin === 1 ? 'minuto' : 'minutos'}`;
    if (diffH < 24) return `há ${diffH} ${diffH === 1 ? 'hora' : 'horas'}`;
    if (diffD < 7) return `há ${diffD} ${diffD === 1 ? 'dia' : 'dias'}`;
    if (diffW < 4) return `há ${diffW} ${diffW === 1 ? 'semana' : 'semanas'}`;
    if (diffM < 12) return `há ${diffM} ${diffM === 1 ? 'mês' : 'meses'}`;
    return `há ${diffY} ${diffY === 1 ? 'ano' : 'anos'}`;
  }

  async criarPublicacao(session: DadosSessaoSocial, dto: CriarPublicacaoDto) {
    const tipo = dto.tipo || 'texto';

    if ((tipo === 'imagem' || tipo === 'video') && !session.usuario.podePostarMidia) {
      throw new ForbiddenException('Você não tem permissão para postar imagem ou vídeo');
    }

    if (dto.urlRedirecionamento && !session.usuario.podePostarLink) {
      throw new ForbiddenException('Você não tem permissão para criar post com área clicável');
    }

    if ((tipo === 'imagem' || tipo === 'video') && !dto.midiaUrl) {
      throw new ForbiddenException('Posts de imagem ou vídeo precisam de midiaUrl');
    }

    const user = await this.userRepository.findOne({ where: { uuid: session.usuario.uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const payload = this.postRepository.create({
      uuid: randomUUID(),
      organizacaoId: user.organizacaoId,
      usuarioId: user.id,
      tipo,
      texto: dto.texto || null,
      midiaUrl: dto.midiaUrl || null,
      urlRedirecionamento: dto.urlRedirecionamento || null,
      tituloRedirecionamento: dto.tituloRedirecionamento || null,
    });

    return this.postRepository.save(payload);
  }

  async adicionarComentario(session: DadosSessaoSocial, publicacaoUuid: string, dto: CriarComentarioDto) {
    const user = await this.userRepository.findOne({ where: { uuid: session.usuario.uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const post = await this.postRepository.findOne({ where: { uuid: publicacaoUuid, organizacaoId: user.organizacaoId } });
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    const comment = this.commentRepository.create({
      publicacaoId: post.id,
      usuarioId: user.id,
      comentario: dto.comentario,
    });

    const savedComment = await this.commentRepository.save(comment);
    await this.logActivitySafe({
      organizacaoId: user.organizacaoId,
      usuarioId: user.id,
      texto: 'comentou em uma publicação',
      urlRedirecionamento: null,
      tituloRedirecionamento: null,
    });

    return savedComment;
  }

  async listarComentarios(session: DadosSessaoSocial, publicacaoUuid: string) {
    const user = await this.userRepository.findOne({ where: { uuid: session.usuario.uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const post = await this.postRepository.findOne({ where: { uuid: publicacaoUuid, organizacaoId: user.organizacaoId } });
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    const comments = await this.commentRepository.find({
      where: { publicacaoId: post.id },
      order: { criadoEm: 'ASC' },
    });

    if (comments.length === 0) {
      return [];
    }

    const authorIds = Array.from(new Set(comments.map((comment) => comment.usuarioId)));
    const authors = await this.userRepository.find({
      where: { id: In(authorIds) },
      select: {
        id: true,
        uuid: true,
        nome: true,
        apelido: true,
        urlAvatar: true,
      },
    });
    const authorAvatarById = await this.resolveUserAvatarUrls(authorIds);
    const authorById = new Map(authors.map((author) => [author.id, author]));

    return comments.map((comment) => {
      const author = authorById.get(comment.usuarioId);
      const authorName = author?.apelido || author?.nome || 'Usuário';

      return {
        id: comment.id,
        comentario: comment.comentario,
        criadoEm: comment.criadoEm,
        authorName,
        authorAvatarUrl: authorAvatarById.get(comment.usuarioId) ?? author?.urlAvatar ?? null,
        authorInitial: authorName.charAt(0).toUpperCase(),
        isFromCurrentUser: comment.usuarioId === user.id,
      };
    });
  }

  async alternarCurtida(session: DadosSessaoSocial, publicacaoUuid: string) {
    const user = await this.userRepository.findOne({ where: { uuid: session.usuario.uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const post = await this.postRepository.findOne({ where: { uuid: publicacaoUuid, organizacaoId: user.organizacaoId } });
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    const existing = await this.likeRepository.findOne({ where: { publicacaoId: post.id, usuarioId: user.id } });
    if (existing) {
      await this.likeRepository.remove(existing);
      return { liked: false };
    }

    await this.likeRepository.save(
      this.likeRepository.create({
        publicacaoId: post.id,
        usuarioId: user.id,
      }),
    );

    const postOwner = post.usuarioId !== user.id
      ? await this.userRepository.findOne({ where: { id: post.usuarioId } })
      : null;
    const postOwnerName = postOwner ? (postOwner.apelido || postOwner.nome) : null;
    const textoAtividade = postOwnerName
      ? `Curtiu uma publicação de @${postOwnerName} 😊👍`
      : 'Curtiu uma publicação 😊👍';

    await this.logActivitySafe({
      organizacaoId: user.organizacaoId,
      usuarioId: user.id,
      texto: textoAtividade,
      urlRedirecionamento: null,
      tituloRedirecionamento: null,
    });

    return { liked: true };
  }

  async compartilhar(session: DadosSessaoSocial, publicacaoUuid: string) {
    const user = await this.userRepository.findOne({ where: { uuid: session.usuario.uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const post = await this.postRepository.findOne({ where: { uuid: publicacaoUuid, organizacaoId: user.organizacaoId } });
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    const shared = await this.compartilharRepository.save(
      this.compartilharRepository.create({
        publicacaoId: post.id,
        usuarioId: user.id,
      }),
    );

    await this.logActivitySafe({
      organizacaoId: user.organizacaoId,
      usuarioId: user.id,
      texto: 'compartilhou uma publicação',
      urlRedirecionamento: null,
      tituloRedirecionamento: null,
    });

    return shared;
  }

  async excluirPublicacao(session: DadosSessaoSocial, publicacaoUuid: string) {
    const user = await this.userRepository.findOne({ where: { uuid: session.usuario.uuid } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const post = await this.postRepository.findOne({
      where: {
        uuid: publicacaoUuid,
        organizacaoId: user.organizacaoId,
      },
    });

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    if (post.usuarioId !== user.id) {
      throw new ForbiddenException('Você só pode excluir suas próprias postagens');
    }

    await this.commentRepository.delete({ publicacaoId: post.id });
    await this.likeRepository.delete({ publicacaoId: post.id });
    await this.compartilharRepository.delete({ publicacaoId: post.id });
    await this.postRepository.delete({ uuid: publicacaoUuid });

    return { deleted: true };
  }
}
