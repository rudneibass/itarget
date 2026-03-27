CREATE TABLE IF NOT EXISTS social.jogo (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_id INTEGER NOT NULL,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  url TEXT NOT NULL,
  custo_moedas INTEGER NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_jogo_organizacao FOREIGN KEY (organizacao_id) REFERENCES social.organizacao(id)
);

CREATE INDEX IF NOT EXISTS idx_social_jogo_organizacao_id ON social.jogo (organizacao_id);

CREATE TABLE IF NOT EXISTS social.acesso_jogo (
  id SERIAL PRIMARY KEY,
  jogo_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  custo_moedas INTEGER NOT NULL DEFAULT 0,
  liberado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_social_acesso_jogo UNIQUE (jogo_id, usuario_id),
  CONSTRAINT fk_social_acesso_jogo_game FOREIGN KEY (jogo_id) REFERENCES social.jogo(id),
  CONSTRAINT fk_social_acesso_jogo_user FOREIGN KEY (usuario_id) REFERENCES social.usuario(id)
);

CREATE INDEX IF NOT EXISTS idx_social_acesso_jogo_usuario_id ON social.acesso_jogo (usuario_id);

