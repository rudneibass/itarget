CREATE TABLE IF NOT EXISTS social.organizacao (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  nome VARCHAR(255) NOT NULL,
  slug VARCHAR(255),
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_social_organizacao_uuid ON social.organizacao (uuid);
