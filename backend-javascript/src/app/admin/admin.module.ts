import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthController } from './controllers/auth/admin-auth.controller';
import { ArquivoController } from './controllers/arquivo/arquivo.controller';
import { HomeController } from './controllers/home/home.controller';
import { JogoController } from './controllers/jogo/jogo.controller';
import { OrganizacaoController } from './controllers/organizacao/organizacao.controller';
import { PerfilInstagramController } from './controllers/perfil-instagram/perfil-instagram.controller';
import { PublicacaoController } from './controllers/publicacao/publicacao.controller';
import { UsuarioController } from './controllers/usuario/usuario.controller';
import { UsuarioSocialController } from './controllers/usuario-social/usuario-social.controller';
import { MiddlewareSessaoAdmin } from './middleware/admin-session.middleware';
import { UsuarioAdmin } from './models/usuario-admin/usuario-admin.entity';
import { UsuarioOrganizacao } from './models/usuario-organizacao/usuario-organizacao.entity';
import { VideoController } from './controllers/video/video.controller';
import { Arquivo } from './models/arquivo/arquivo.entity';
import { Video } from './models/video/video.entity';
import { Jogo } from '../social/models/jogo/jogo.entity';
import { Organizacao } from '../social/models/organizacao/organizacao.entity';
import { PermissaoUsuario } from '../social/models/permissao-usuario/permissao-usuario.entity';
import { PerfilInstagram } from '../social/models/perfil-instagram/perfil-instagram.entity';
import { Publicacao } from '../social/models/publicacao/publicacao.entity';
import { Usuario } from '../social/models/usuario/usuario.entity';
import { AdminAuthService } from './services/auth/admin-auth.service';
import { AdminSessionService } from './services/auth/admin-session.service';
import { ArquivoService } from './services/arquivo/arquivo.service';
import { JogoService } from './services/jogo/jogo.service';
import { OrganizacaoService } from './services/organizacao/organizacao.service';
import { PerfilInstagramService } from './services/perfil-instagram/perfil-instagram.service';
import { PublicacaoAdminService } from './services/publicacao/publicacao.service';
import { UsuarioAdminService } from './services/usuario-admin/usuario-admin.service';
import { UsuarioSocialService } from './services/usuario-social/usuario-social.service';
import { VideoService } from './services/video/video.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Arquivo,
      Video,
      Organizacao,
      Usuario,
      PermissaoUsuario,
      Jogo,
      Publicacao,
      PerfilInstagram,
      UsuarioAdmin,
      UsuarioOrganizacao,
    ]),
  ],
  controllers: [
    AdminAuthController,
    ArquivoController,
    HomeController,
    VideoController,
    OrganizacaoController,
    UsuarioController,
    UsuarioSocialController,
    JogoController,
    PerfilInstagramController,
    PublicacaoController,
  ],
  providers: [
    VideoService,
    ArquivoService,
    OrganizacaoService,
    UsuarioAdminService,
    UsuarioSocialService,
    JogoService,
    PerfilInstagramService,
    PublicacaoAdminService,
    AdminSessionService,
    AdminAuthService,
    MiddlewareSessaoAdmin,
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareSessaoAdmin)
      .forRoutes(
        HomeController,
        ArquivoController,
        VideoController,
        OrganizacaoController,
        UsuarioController,
        UsuarioSocialController,
        JogoController,
        PerfilInstagramController,
        PublicacaoController,
      );
  }
}
