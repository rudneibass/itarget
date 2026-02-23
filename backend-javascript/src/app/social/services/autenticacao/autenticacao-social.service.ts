import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organizacao } from '../../models/organizacao/organizacao.entity';
import { PermissaoUsuario } from '../../models/permissao-usuario/permissao-usuario.entity';
import { Usuario } from '../../models/usuario/usuario.entity';
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
    private readonly sessionService: SessaoService,
  ) {}

  async authenticateByQr(organizacaoUuid: string, userHash: string): Promise<DadosSessaoSocial> {
    const school = await this.schoolRepository.findOne({ where: { uuid: organizacaoUuid, ativo: true } });
    if (!school) {
      throw new NotFoundException('Organizacao não encontrada ou inativa');
    }

    const user = await this.userRepository.findOne({
      where: {
        organizacaoUuid,
        hashQr: userHash,
        ativo: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('QRCode inválido para esta organizacao');
    }

    const permission = await this.permissionRepository.findOne({
      where: { usuarioUuid: user.uuid },
    });

    return this.sessionService.create({
      organizacaoUuid,
      organizacao: {
        nome: school.nome,
        logoUrl: null,
      },
      usuario: {
        uuid: user.uuid,
        nome: user.nome,
        urlAvatar: user.urlAvatar,
        moedas: user.moedas,
        podePostarMidia: permission?.podePostarMidia ?? false,
        podePostarLink: permission?.podePostarLink ?? false,
      },
    });
  }

  obterSessao(sessaoId: string) {
    return this.sessionService.get(sessaoId);
  }

  encerrarSessao(sessaoId: string): void {
    this.sessionService.delete(sessaoId);
  }
}
