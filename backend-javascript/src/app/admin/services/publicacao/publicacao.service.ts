import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import { PerfilInstagram } from '../../../social/models/perfil-instagram/perfil-instagram.entity';
import { Publicacao } from '../../../social/models/publicacao/publicacao.entity';
import { Usuario } from '../../../social/models/usuario/usuario.entity';
import { OrganizacaoService } from '../organizacao/organizacao.service';

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

    const publicacao = this.publicacaoRepository.create({
      uuid: randomUUID(),
      organizacaoId,
      usuarioId,
      tipo: payload.tipo || 'texto',
      texto: payload.texto || null,
      midiaUrl: payload.midiaUrl || null,
      urlRedirecionamento: payload.urlRedirecionamento || null,
      tituloRedirecionamento: payload.tituloRedirecionamento || null,
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
    },
  ) {
    const organizacaoId = await this.getOrganizationIdByOwner(ownerUuid);
    const usuarioId = await this.resolveUsuarioIdForOrganization(organizacaoId, undefined, ownerUuid);
    //const urlRedirecionamento = `https://www.instagram.com/p/${data.code}/`;
    const midiaUrl = `https://www.instagram.com/p/${data.code}/`;

    const existing = await this.publicacaoRepository.findOne({
      where: { organizacaoId, midiaUrl },
    });

    if (existing) {
      return { created: false, publicacao: existing };
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
          });

          if (result.created) {
            profileCreated += 1;
            totalCreated += 1;
          } else {
            profileSkipped += 1;
            totalSkipped += 1;
          }
        }

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
}
