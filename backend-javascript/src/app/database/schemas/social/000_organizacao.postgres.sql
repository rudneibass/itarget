CREATE TABLE IF NOT EXISTS social.organizacao (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  slug VARCHAR(255),
  nome VARCHAR(255) NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_organizacao_uuid ON social.organizacao (uuid);
