import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { Repository } from 'typeorm';
import { UsuarioAdmin } from '../../models/usuario-admin/usuario-admin.entity';
import { Arquivo } from '../../models/arquivo/arquivo.entity';
import { Video } from '../../models/video/video.entity';
import { Organizacao } from '../../../social/models/organizacao/organizacao.entity';
import { Usuario } from '../../../social/models/usuario/usuario.entity';
import { Jogo } from '../../../social/models/jogo/jogo.entity';
import { Publicacao } from '../../../social/models/publicacao/publicacao.entity';
import { PerfilInstagram } from '../../../social/models/perfil-instagram/perfil-instagram.entity';

interface CreateArquivoPayload {
  slug?: string;
  entidadePai?: string;
  entidadePaiId?: string | number;
  configuracao?: string | Record<string, any>;
}

@Injectable()
export class ArquivoService {
  constructor(
    @InjectRepository(Arquivo)
    private readonly arquivoRepository: Repository<Arquivo>,
    @InjectRepository(UsuarioAdmin)
    private readonly usuarioAdminRepository: Repository<UsuarioAdmin>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(Organizacao)
    private readonly organizacaoRepository: Repository<Organizacao>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Jogo)
    private readonly jogoRepository: Repository<Jogo>,
    @InjectRepository(Publicacao)
    private readonly publicacaoRepository: Repository<Publicacao>,
    @InjectRepository(PerfilInstagram)
    private readonly perfilInstagramRepository: Repository<PerfilInstagram>,
  ) {}

  private normalizeOrganizationId(organizacaoId: number | null | undefined) {
    const normalized = Number(organizacaoId || 0);
    if (!Number.isInteger(normalized) || normalized <= 0) {
      throw new BadRequestException('Organização inválida na sessão do usuário.');
    }

    return normalized;
  }

  /**
   * Resolve UUID to database entity (with ID).
   * Pattern: Controller sends UUID → Service resolves to entity with ID → Logic uses ID
   */
  private async resolveByUuid(organizacaoId: number, uuid: string) {
    const arquivo = await this.arquivoRepository.findOne({ where: { uuid } });
    if (!arquivo) {
      throw new NotFoundException('Arquivo não encontrado');
    }

    // Validate that entity belongs to organization
    await this.assertEntityInOrganization(arquivo.entidadePai, Number(arquivo.entidadePaiId), organizacaoId);

    return arquivo;
  }

  private async getUsuarioAdminId(ownerUuid: string) {
    const owner = await this.usuarioAdminRepository.findOne({ where: { uuid: ownerUuid } });
    if (!owner) {
      throw new NotFoundException('Usuário admin não encontrado');
    }

    return owner.id;
  }

  private async resolveEntidadePaiId(entidadePai: string, entidadePaiId: string | number) {
    const raw = String(entidadePaiId || '').trim();
    if (!raw) {
      throw new BadRequestException('entidadePaiId é obrigatório');
    }

    const numericId = Number(raw);
    if (Number.isInteger(numericId) && numericId > 0) {
      return numericId;
    }

    if (entidadePai === 'video') {
      const video = await this.videoRepository.findOne({ where: { uuid: raw } });
      if (!video) {
        throw new BadRequestException('Vídeo pai não encontrado para o arquivo enviado.');
      }
      return video.id;
    }

    throw new BadRequestException('entidadePaiId deve ser um número inteiro válido.');
  }

  private parseConfiguracao(configuracao?: string | Record<string, any>) {
    if (!configuracao) {
      return null;
    }

    if (typeof configuracao === 'object') {
      return configuracao;
    }

    try {
      return JSON.parse(configuracao);
    } catch {
      throw new BadRequestException('configuracao deve ser um JSON válido');
    }
  }

  private resolveAbsolutePathFromUrl(url: string) {
    return join(process.cwd(), 'uploads', 'admin', (url || '').split('/').pop() || '');
  }

  private removePhysicalFileByUrl(url: string) {
    const absolutePath = this.resolveAbsolutePathFromUrl(url);
    if (existsSync(absolutePath)) {
      unlinkSync(absolutePath);
    }
  }

  private async replaceAvatarIfNeeded(entidadePai: string, entidadePaiId: number, slug: string | null, tipo: string) {
    const isAvatar = (slug || '').toLowerCase() === 'avatar';
    const isImage = (tipo || '').toLowerCase().startsWith('image/');

    if (!isAvatar) {
      return;
    }

    if (!isImage) {
      throw new BadRequestException('Avatar deve ser um arquivo de imagem.');
    }

    const previousAvatars = await this.arquivoRepository
      .createQueryBuilder('arquivo')
      .where('arquivo.entidadePai = :entidadePai', { entidadePai })
      .andWhere('arquivo.entidadePaiId = :entidadePaiId', { entidadePaiId })
      .andWhere('LOWER(arquivo.slug) = :slug', { slug: 'avatar' })
      .getMany();

    if (!previousAvatars.length) {
      return;
    }

    previousAvatars.forEach((item) => this.removePhysicalFileByUrl(item.url));
    await this.arquivoRepository.remove(previousAvatars);
  }

  private async assertEntityInOrganization(entidadePai: string, entidadePaiId: number, organizacaoId: number) {
    const parent = (entidadePai || '').trim().toLowerCase();

    if (parent === 'organizacao') {
      if (entidadePaiId !== organizacaoId) {
        throw new NotFoundException('Entidade não encontrada na organização do usuário.');
      }

      const organizacao = await this.organizacaoRepository.findOne({ where: { id: entidadePaiId } });
      if (!organizacao) {
        throw new NotFoundException('Entidade não encontrada na organização do usuário.');
      }
      return;
    }

    if (parent === 'usuario') {
      const entity = await this.usuarioRepository.findOne({ where: { id: entidadePaiId, organizacaoId } });
      if (!entity) {
        throw new NotFoundException('Entidade não encontrada na organização do usuário.');
      }
      return;
    }

    if (parent === 'jogo') {
      const entity = await this.jogoRepository.findOne({ where: { id: entidadePaiId, organizacaoId } });
      if (!entity) {
        throw new NotFoundException('Entidade não encontrada na organização do usuário.');
      }
      return;
    }

    if (parent === 'publicacao') {
      const entity = await this.publicacaoRepository.findOne({ where: { id: entidadePaiId, organizacaoId } });
      if (!entity) {
        throw new NotFoundException('Entidade não encontrada na organização do usuário.');
      }
      return;
    }

    if (parent === 'perfil_instagram' || parent === 'perfil-instagram') {
      const entity = await this.perfilInstagramRepository.findOne({ where: { id: entidadePaiId, organizacaoId } });
      if (!entity) {
        throw new NotFoundException('Entidade não encontrada na organização do usuário.');
      }
    }
  }

  async createFromUpload(
    organizacaoId: number | null | undefined,
    ownerUuid: string,
    payload: CreateArquivoPayload,
    file: any,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo não enviado.');
    }

    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);

    const entidadePai = String(payload.entidadePai || '').trim();
    if (!entidadePai) {
      throw new BadRequestException('entidadePai é obrigatório');
    }

    const entidadePaiId = await this.resolveEntidadePaiId(entidadePai, payload.entidadePaiId || '');
    await this.assertEntityInOrganization(entidadePai, entidadePaiId, normalizedOrgId);
    const usuarioId = await this.getUsuarioAdminId(ownerUuid);
    const slug = payload.slug?.trim() || null;

    await this.replaceAvatarIfNeeded(entidadePai, entidadePaiId, slug, file.mimetype);

    const arquivo = this.arquivoRepository.create({
      uuid: randomUUID(),
      slug,
      entidadePai,
      entidadePaiId,
      nome: file.originalname,
      url: `/admin/uploads/${file.filename}`,
      tipo: file.mimetype,
      tamanho: file.size,
      configuracao: this.parseConfiguracao(payload.configuracao),
      criadoPorUsuarioId: usuarioId,
      alteradoPorUsuarioId: usuarioId,
    });

    return this.arquivoRepository.save(arquivo);
  }

  async findAll(organizacaoId: number | null | undefined, filters: { entidadePai?: string; entidadePaiId?: string | number }) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    const where: any = {};

    if (filters.entidadePai) {
      where.entidadePai = filters.entidadePai;
    }

    if (filters.entidadePaiId !== undefined && filters.entidadePaiId !== null && filters.entidadePaiId !== '') {
      const parentId = Number(filters.entidadePaiId);
      if (Number.isInteger(parentId) && parentId > 0) {
        where.entidadePaiId = parentId;
      }
    }

    const arquivos = await this.arquivoRepository.find({
      where,
      order: { id: 'DESC' },
    });

    const result: Arquivo[] = [];
    for (const arquivo of arquivos) {
      try {
        await this.assertEntityInOrganization(arquivo.entidadePai, Number(arquivo.entidadePaiId), normalizedOrgId);
        result.push(arquivo);
      } catch {
        // Ignora registros fora do escopo da organização da sessão.
      }
    }

    return result;
  }

  async findLatestImageByEntity(organizacaoId: number | null | undefined, entidadePai: string, entidadePaiId: number) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    await this.assertEntityInOrganization(entidadePai, entidadePaiId, normalizedOrgId);

    return this.arquivoRepository
      .createQueryBuilder('arquivo')
      .where('arquivo.entidadePai = :entidadePai', { entidadePai })
      .andWhere('arquivo.entidadePaiId = :entidadePaiId', { entidadePaiId })
      .andWhere('LOWER(arquivo.tipo) LIKE :tipo', { tipo: 'image/%' })
      .orderBy('arquivo.id', 'DESC')
      .getOne();
  }

  async get(organizacaoId: number | null | undefined, uuid: string) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    return this.resolveByUuid(normalizedOrgId, uuid);
  }

  async remove(organizacaoId: number | null | undefined, uuid: string) {
    const normalizedOrgId = this.normalizeOrganizationId(organizacaoId);
    const arquivo = await this.resolveByUuid(normalizedOrgId, uuid);

    this.removePhysicalFileByUrl(arquivo.url);

    await this.arquivoRepository.remove(arquivo);
  }
}
