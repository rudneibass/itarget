import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthController } from './controllers/auth/admin-auth.controller';
import { HomeController } from './controllers/home/home.controller';
import { JogoController } from './controllers/jogo/jogo.controller';
import { OrganizacaoController } from './controllers/organizacao/organizacao.controller';
import { RecompensaController } from './controllers/recompensa/recompensa.controller';
import { UsuarioController } from './controllers/usuario/usuario.controller';
import { MiddlewareSessaoAdmin } from './middleware/admin-session.middleware';
import { UsuarioAdmin } from './models/usuario-admin/usuario-admin.entity';
import { VideoController } from './controllers/video/video.controller';
import { Video } from './models/video/video.entity';
import { Jogo } from '../social/models/jogo/jogo.entity';
import { Organizacao } from '../social/models/organizacao/organizacao.entity';
import { PermissaoUsuario } from '../social/models/permissao-usuario/permissao-usuario.entity';
import { Recompensa } from '../social/models/recompensa/recompensa.entity';
import { Usuario } from '../social/models/usuario/usuario.entity';
import { AdminAuthService } from './services/auth/admin-auth.service';
import { AdminSessionService } from './services/auth/admin-session.service';
import { JogoService } from './services/jogo/jogo.service';
import { OrganizacaoService } from './services/organizacao/organizacao.service';
import { RecompensaService } from './services/recompensa/recompensa.service';
import { UsuarioService } from './services/usuario/usuario.service';
import { VideoService } from './services/video/video.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Video,
      Organizacao,
      Usuario,
      PermissaoUsuario,
      Jogo,
      Recompensa,
      UsuarioAdmin,
    ]),
  ],
  controllers: [
    AdminAuthController,
    HomeController,
    VideoController,
    OrganizacaoController,
    UsuarioController,
    JogoController,
    RecompensaController,
  ],
  providers: [
    VideoService,
    OrganizacaoService,
    UsuarioService,
    JogoService,
    RecompensaService,
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
        VideoController,
        OrganizacaoController,
        UsuarioController,
        JogoController,
        RecompensaController,
      );
  }
}
