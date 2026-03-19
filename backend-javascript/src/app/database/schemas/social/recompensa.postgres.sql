CREATE TABLE IF NOT EXISTS social.recompensa (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_uuid TEXT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  tipo VARCHAR(120) NOT NULL,
  custo_moedas INTEGER NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_recompensa_organizacao FOREIGN KEY (organizacao_uuid) REFERENCES social.organizacao(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_recompensa_organizacao_uuid ON social.recompensa (organizacao_uuid);
