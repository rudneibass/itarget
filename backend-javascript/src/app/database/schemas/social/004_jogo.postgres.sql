CREATE TABLE IF NOT EXISTS social.jogo (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_uuid TEXT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  url TEXT NOT NULL,
  custo_moedas INTEGER NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_jogo_organizacao FOREIGN KEY (organizacao_uuid) REFERENCES social.organizacao(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_jogo_organizacao_uuid ON social.jogo (organizacao_uuid);

CREATE TABLE IF NOT EXISTS social.acesso_jogo (
  id SERIAL PRIMARY KEY,
  jogo_uuid TEXT NOT NULL,
  usuario_uuid TEXT NOT NULL,
  custo_moedas INTEGER NOT NULL DEFAULT 0,
  liberado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_social_acesso_jogo UNIQUE (jogo_uuid, usuario_uuid),
  CONSTRAINT fk_social_acesso_jogo_game FOREIGN KEY (jogo_uuid) REFERENCES social.jogo(uuid),
  CONSTRAINT fk_social_acesso_jogo_user FOREIGN KEY (usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_acesso_jogo_usuario_uuid ON social.acesso_jogo (usuario_uuid);

