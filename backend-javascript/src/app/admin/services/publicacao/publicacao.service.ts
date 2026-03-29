import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { PerfilInstagram } from '../../../social/models/perfil-instagram/perfil-instagram.entity';
import { Publicacao } from '../../../social/models/publicacao/publicacao.entity';
import { Usuario } from '../../../social/models/usuario/usuario.entity';
import { OrganizacaoService } from '../organizacao/organizacao.service';

const CONTEUDO_VALUES = ['EXTERNO', 'INTERNO', 'ANUNCIANTE'] as const;
const ESCOPO_VALUES = ['PRIVADO', 'PUBLICO'] as const;

@Injectable()
export class PublicacaoAdminService {
  constructor(
    @InjectRepository(Publicacao)
    private readonly publicacaoRepository: Repository<Publicacao>,
    @InjectRepository(PerfilInstagram)
    private readonly perfilInstagramRepository: Repository<PerfilInstagram>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly organizacaoService: OrganizacaoService,
  ) {}

  async findAll() {
    return this.publicacaoRepository.find({ order: { id: 'DESC' } });
  }

  async get(uuid: string) {
    const publicacao = await this.publicacaoRepository.findOne({ where: { uuid } });
    if (!publicacao) {
      throw new NotFoundException('Publicação não encontrada');
    }

    return publicacao;
  }

  async create(ownerUuid: string, payload: Partial<Publicacao>) {
    const organizacaoId = await this.getOrganizationIdByOwner(ownerUuid);
    const usuarioId = await this.resolveUsuarioIdForOrganization(organizacaoId, payload.usuarioId);
    const conteudo = this.parseConteudo(payload.conteudo);
    const escopo = this.parseEscopo(payload.escopo);
    const destaque = this.parseBoolean(payload.destaque, false);

    const publicacao = this.publicacaoRepository.create({
      uuid: randomUUID(),
      organizacaoId,
      usuarioId,
      tipo: payload.tipo || 'texto',
      texto: payload.texto || null,
      midiaUrl: payload.midiaUrl || null,
      urlRedirecionamento: payload.urlRedirecionamento || null,
      tituloRedirecionamento: payload.tituloRedirecionamento || null,
      conteudo,
      escopo,
      destaque,
    });

    return this.publicacaoRepository.save(publicacao);
  }

  async update(uuid: string, payload: Partial<Publicacao>) {
    const publicacao = await this.get(uuid);

    publicacao.tipo = payload.tipo ?? publicacao.tipo;
    publicacao.texto = payload.texto ?? publicacao.texto;
    publicacao.midiaUrl = payload.midiaUrl ?? publicacao.midiaUrl;
    publicacao.urlRedirecionamento = payload.urlRedirecionamento ?? publicacao.urlRedirecionamento;
    publicacao.tituloRedirecionamento = payload.tituloRedirecionamento ?? publicacao.tituloRedirecionamento;

    if (payload.conteudo !== undefined) {
      publicacao.conteudo = this.parseConteudo(payload.conteudo);
    }

    if (payload.escopo !== undefined) {
      publicacao.escopo = this.parseEscopo(payload.escopo);
    }

    if (payload.destaque !== undefined) {
      publicacao.destaque = this.parseBoolean(payload.destaque, publicacao.destaque);
    }

    if (payload.usuarioId !== undefined) {
      publicacao.usuarioId = Number(payload.usuarioId);
    }

    return this.publicacaoRepository.save(publicacao);
  }

  async remove(uuid: string) {
    const publicacao = await this.get(uuid);
    await this.publicacaoRepository.remove(publicacao);
  }

  async listInstagramProfiles(ownerUuid: string) {
    const organizacaoId = await this.getOrganizationIdByOwner(ownerUuid);

    return this.perfilInstagramRepository.find({
      where: { organizacaoId, ativo: true },
      order: { id: 'ASC' },
    });
  }

  async createInstagramPublication(
    ownerUuid: string,
    data: {
      profile: string;
      category?: string | null;
      code: string;
      conteudo?: string | null;
      escopo?: string | null;
      destaque?: boolean | string | null;
    },
  ) {
    const organizacaoId = await this.getOrganizationIdByOwner(ownerUuid);
    const usuarioId = await this.resolveUsuarioIdForOrganization(organizacaoId, undefined, ownerUuid);
    //const urlRedirecionamento = `https://www.instagram.com/p/${data.code}/`;
    const midiaUrl = `https://www.instagram.com/p/${data.code}/`;
    const conteudo = this.parseConteudo(data.conteudo);
    const escopo = this.parseEscopo(data.escopo);
    const destaque = this.parseBoolean(data.destaque, false);

    const existing = await this.publicacaoRepository.findOne({
      where: { organizacaoId, midiaUrl },
    });

    if (existing) {
      existing.conteudo = conteudo;
      existing.escopo = escopo;
      existing.destaque = destaque;
      const updated = await this.publicacaoRepository.save(existing);
      return { created: false, publicacao: updated };
    }

    const publicacao = this.publicacaoRepository.create({
      uuid: randomUUID(),
      organizacaoId,
      usuarioId,
      tipo: 'instagram',
      texto: `Post do Instagram @${data.profile}`,
      midiaUrl,
      //urlRedirecionamento,
      tituloRedirecionamento: data.category || `Instagram @${data.profile}`,
      conteudo,
      escopo,
      destaque,
    });

    const saved = await this.publicacaoRepository.save(publicacao);
    return { created: true, publicacao: saved };
  }

  async syncInstagram(ownerUuid: string) {
    const profiles = await this.listInstagramProfiles(ownerUuid);

    if (profiles.length === 0) {
      return {
        totalProfiles: 0,
        totalCreated: 0,
        totalSkipped: 0,
        message: 'Nenhum perfil ativo cadastrado em social.perfil_instagram.',
      };
    }

    const apiUrl = process.env.INSTAGRAM_RAPIDAPI_URL || 'https://instagram230.p.rapidapi.com/user/posts';
    const apiHost = process.env.INSTAGRAM_RAPIDAPI_HOST || 'instagram230.p.rapidapi.com';
    const apiKey = process.env.INSTAGRAM_RAPIDAPI_KEY;

    if (!apiKey) {
      throw new BadRequestException('Configure INSTAGRAM_RAPIDAPI_KEY no ambiente para executar o sync.');
    }

    let totalCreated = 0;
    let totalSkipped = 0;
    const details: any[] = [];

    for (const profile of profiles) {
      try {
        const requestUrl = `${apiUrl}?username=${encodeURIComponent(profile.perfil)}`;
        const response = await fetch(requestUrl, {
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost,
          },
        });

        if (!response.ok) {
          details.push({
            profile: profile.perfil,
            created: 0,
            skipped: 0,
            error: `Falha na API externa (${response.status})`,
          });
          continue;
        }

        const payload = await response.json();
        const items = Array.isArray(payload?.items) ? payload.items : [];

        let profileCreated = 0;
        let profileSkipped = 0;

        for (const item of items) {
          const code = item?.code;
          if (!code) {
            continue;
          }

          const result = await this.createInstagramPublication(ownerUuid, {
            profile: profile.perfil,
            category: profile.categoria,
            code,
            conteudo: profile.conteudo,
            escopo: profile.escopo,
            destaque: profile.destaque,
          });

          if (result.created) {
            profileCreated += 1;
            totalCreated += 1;
          } else {
            profileSkipped += 1;
            totalSkipped += 1;
          }
        }

        await this.perfilInstagramRepository.update({ uuid: profile.uuid }, { sincronizadoEm: new Date() } as any);

        details.push({
          profile: profile.perfil,
          created: profileCreated,
          skipped: profileSkipped,
          totalItems: items.length,
        });
      } catch (error) {
        details.push({
          profile: profile.perfil,
          created: 0,
          skipped: 0,
          error: error instanceof Error ? error.message : 'Erro inesperado no sync',
        });
      }
    }

    return {
      totalProfiles: profiles.length,
      totalCreated,
      totalSkipped,
      details,
    };
  }

  async syncInstagramByUuid(ownerUuid: string, perfilUuid: string) {
    const organizacaoId = await this.getOrganizationIdByOwner(ownerUuid);

    const profile = await this.perfilInstagramRepository.findOne({
      where: { uuid: perfilUuid, organizacaoId, ativo: true },
    });

    if (!profile) {
      throw new NotFoundException('Perfil de Instagram não encontrado ou inativo.');
    }

    const apiUrl = process.env.INSTAGRAM_RAPIDAPI_URL || 'https://instagram230.p.rapidapi.com/user/posts';
    const apiHost = process.env.INSTAGRAM_RAPIDAPI_HOST || 'instagram230.p.rapidapi.com';
    const apiKey = process.env.INSTAGRAM_RAPIDAPI_KEY;

    if (!apiKey) {
      throw new BadRequestException('Configure INSTAGRAM_RAPIDAPI_KEY no ambiente para executar o sync.');
    }

    const requestUrl = `${apiUrl}?username=${encodeURIComponent(profile.perfil)}`;
    const response = await fetch(requestUrl, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    });

    if (!response.ok) {
      throw new BadRequestException(`Falha na API externa (${response.status}) para o perfil @${profile.perfil}.`);
    }

    const payload = await response.json();
    const items = Array.isArray(payload?.items) ? payload.items : [];

    let totalCreated = 0;
    let totalSkipped = 0;

    for (const item of items) {
      const code = item?.code;
      if (!code) {
        continue;
      }

      const result = await this.createInstagramPublication(ownerUuid, {
        profile: profile.perfil,
        category: profile.categoria,
        code,
        conteudo: profile.conteudo,
        escopo: profile.escopo,
        destaque: profile.destaque,
      });

      if (result.created) {
        totalCreated += 1;
      } else {
        totalSkipped += 1;
      }
    }

    await this.perfilInstagramRepository.update({ uuid: perfilUuid }, { sincronizadoEm: new Date() } as any);

    return {
      profile: profile.perfil,
      totalCreated,
      totalSkipped,
      totalItems: items.length,
    };
  }

  private async getOrganizationIdByOwner(ownerUuid: string) {
    const organizacaoUuid = await this.organizacaoService.getOwnedOrganizationUuid(ownerUuid);
    if (!organizacaoUuid) {
      throw new BadRequestException('Você precisa criar uma organização antes de continuar.');
    }

    const orgRows = await this.publicacaoRepository.query('SELECT id FROM public.organizacao WHERE uuid = $1', [organizacaoUuid]);
    if (!orgRows?.[0]?.id) {
      throw new BadRequestException('Organização não encontrada para o usuário atual.');
    }

    return Number(orgRows[0].id);
  }

  private async resolveUsuarioIdForOrganization(organizacaoId: number, usuarioId?: number, ownerUuid?: string) {
    if (usuarioId) {
      const usuario = await this.usuarioRepository.findOne({ where: { id: Number(usuarioId), organizacaoId } });
      if (!usuario) {
        throw new BadRequestException('Usuário informado não pertence à organização.');
      }
      return usuario.id;
    }

    if (ownerUuid) {
      const ownerUser = await this.usuarioRepository.findOne({ where: { uuid: ownerUuid, organizacaoId } });
      if (ownerUser) {
        return ownerUser.id;
      }
    }

    const firstUser = await this.usuarioRepository.findOne({
      where: { organizacaoId, ativo: true },
      order: { id: 'ASC' },
    });

    if (!firstUser) {
      throw new BadRequestException('Nenhum usuário social ativo encontrado para vincular a publicação.');
    }

    return firstUser.id;
  }

  private parseConteudo(value: unknown) {
    const normalized = String(value ?? 'EXTERNO').trim().toUpperCase();
    if (!CONTEUDO_VALUES.includes(normalized as (typeof CONTEUDO_VALUES)[number])) {
      throw new BadRequestException(`Conteúdo inválido. Valores aceitos: ${CONTEUDO_VALUES.join(', ')}`);
    }
    return normalized;
  }

  private parseEscopo(value: unknown) {
    const normalized = String(value ?? 'PRIVADO').trim().toUpperCase();
    if (!ESCOPO_VALUES.includes(normalized as (typeof ESCOPO_VALUES)[number])) {
      throw new BadRequestException(`Escopo inválido. Valores aceitos: ${ESCOPO_VALUES.join(', ')}`);
    }
    return normalized;
  }

  private parseBoolean(value: unknown, defaultValue: boolean) {
    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true') {
        return true;
      }
      if (normalized === 'false') {
        return false;
      }
    }

    return defaultValue;
  }
}
