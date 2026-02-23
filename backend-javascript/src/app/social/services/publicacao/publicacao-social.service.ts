import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { CriarComentarioDto } from '../../dtos/publicacao/criar-comentario.dto';
import { CriarPublicacaoDto } from '../../dtos/publicacao/criar-publicacao.dto';
import { ComentarioPublicacao } from '../../models/comentario-publicacao/comentario-publicacao.entity';
import { CurtidaPublicacao } from '../../models/curtida-publicacao/curtida-publicacao.entity';
import { CompartilhamentoPublicacao } from '../../models/compartilhamento-publicacao/compartilhamento-publicacao.entity';
import { Publicacao } from '../../models/publicacao/publicacao.entity';
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
  ) {}

  async listTimeline(organizacaoUuid: string) {
    const posts = await this.postRepository.find({
      where: { organizacaoUuid },
      order: { criadoEm: 'DESC' },
      take: 50,
    });

    const withCounters = await Promise.all(
      posts.map(async (post, index) => {
        const isTextHighlight = !post.midiaUrl && (post.tipo === 'texto' || post.tipo === 'emoji');
        const [likes, comments, compartilhars] = await Promise.all([
          this.likeRepository.count({ where: { publicacaoUuid: post.uuid } }),
          this.commentRepository.count({ where: { publicacaoUuid: post.uuid } }),
          this.compartilharRepository.count({ where: { publicacaoUuid: post.uuid } }),
        ]);

        return {
          ...post,
          isVideo: post.tipo === 'video',
          isTextHighlight,
          textHighlightVariant: isTextHighlight ? (index % 3) + 1 : null,
          likes,
          comments,
          compartilhars,
        };
      }),
    );

    return withCounters;
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

    const payload = this.postRepository.create({
      uuid: randomUUID(),
      organizacaoUuid: session.organizacaoUuid,
      usuarioUuid: session.usuario.uuid,
      tipo,
      texto: dto.texto || null,
      midiaUrl: dto.midiaUrl || null,
      urlRedirecionamento: dto.urlRedirecionamento || null,
      tituloRedirecionamento: dto.tituloRedirecionamento || null,
    });

    return this.postRepository.save(payload);
  }

  async adicionarComentario(session: DadosSessaoSocial, publicacaoUuid: string, dto: CriarComentarioDto) {
    const post = await this.postRepository.findOne({ where: { uuid: publicacaoUuid, organizacaoUuid: session.organizacaoUuid } });
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    const comment = this.commentRepository.create({
      publicacaoUuid,
      usuarioUuid: session.usuario.uuid,
      comentario: dto.comentario,
    });

    return this.commentRepository.save(comment);
  }

  async alternarCurtida(session: DadosSessaoSocial, publicacaoUuid: string) {
    const post = await this.postRepository.findOne({ where: { uuid: publicacaoUuid, organizacaoUuid: session.organizacaoUuid } });
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    const existing = await this.likeRepository.findOne({ where: { publicacaoUuid, usuarioUuid: session.usuario.uuid } });
    if (existing) {
      await this.likeRepository.remove(existing);
      return { liked: false };
    }

    await this.likeRepository.save(
      this.likeRepository.create({
        publicacaoUuid,
        usuarioUuid: session.usuario.uuid,
      }),
    );

    return { liked: true };
  }

  async compartilhar(session: DadosSessaoSocial, publicacaoUuid: string) {
    const post = await this.postRepository.findOne({ where: { uuid: publicacaoUuid, organizacaoUuid: session.organizacaoUuid } });
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    return this.compartilharRepository.save(
      this.compartilharRepository.create({
        publicacaoUuid,
        usuarioUuid: session.usuario.uuid,
      }),
    );
  }
}
