import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcessoController } from './controllers/acesso/acesso.controller';
import { AtividadeController } from './controllers/atividade/atividade.controller';
import { AdminController } from './controllers/controle-admin/admin.controller';
import { ConversaController } from './controllers/conversa/conversa.controller';
import { EconomiaController } from './controllers/economia/economia.controller';
import { PublicacaoController } from './controllers/publicacao/publicacao.controller';
import { InicioController } from './controllers/inicio/inicio.controller';
import { TentativaAtividade } from './models/tentativa-atividade/tentativa-atividade.entity';
import { PerguntaAtividade } from './models/pergunta-atividade/pergunta-atividade.entity';
import { Atividade } from './models/atividade/atividade.entity';
import { MensagemConversa } from './models/mensagem-conversa/mensagem-conversa.entity';
import { ParticipanteConversa } from './models/participante-conversa/participante-conversa.entity';
import { Conversa } from './models/conversa/conversa.entity';
import { AcessoJogo } from './models/acesso-jogo/acesso-jogo.entity';
import { Jogo } from './models/jogo/jogo.entity';
import { ComentarioPublicacao } from './models/comentario-publicacao/comentario-publicacao.entity';
import { CurtidaPublicacao } from './models/curtida-publicacao/curtida-publicacao.entity';
import { CompartilhamentoPublicacao } from './models/compartilhamento-publicacao/compartilhamento-publicacao.entity';
import { Publicacao } from './models/publicacao/publicacao.entity';
import { ResgateRecompensa } from './models/resgate-recompensa/resgate-recompensa.entity';
import { Recompensa } from './models/recompensa/recompensa.entity';
import { Organizacao } from './models/organizacao/organizacao.entity';
import { PermissaoUsuario } from './models/permissao-usuario/permissao-usuario.entity';
import { Usuario } from './models/usuario/usuario.entity';
import { MiddlewareSessaoSocial } from './middleware/sessao-social.middleware';
import { AtividadeService } from './services/atividade/atividade-social.service';
import { AutenticacaoService } from './services/autenticacao/autenticacao-social.service';
import { ConversaService } from './services/conversa/conversa-social.service';
import { EconomiaService } from './services/economia/economia-social.service';
import { PublicacaoService } from './services/publicacao/publicacao-social.service';
import { SessaoService } from './services/sessao/sessao-social.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organizacao,
      Usuario,
      PermissaoUsuario,
      Publicacao,
      ComentarioPublicacao,
      CurtidaPublicacao,
      CompartilhamentoPublicacao,
      Recompensa,
      ResgateRecompensa,
      Atividade,
      PerguntaAtividade,
      TentativaAtividade,
      Jogo,
      AcessoJogo,
      Conversa,
      ParticipanteConversa,
      MensagemConversa,
    ]),
  ],
  controllers: [
    AcessoController,
    InicioController,
    PublicacaoController,
    AtividadeController,
    EconomiaController,
    ConversaController,
    AdminController,
  ],
  providers: [
    SessaoService,
    AutenticacaoService,
    PublicacaoService,
    AtividadeService,
    EconomiaService,
    ConversaService,
  ],
})
export class SocialModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareSessaoSocial)
      .forRoutes(
        InicioController,
        PublicacaoController,
        AtividadeController,
        EconomiaController,
        ConversaController,
      );
  }
}
