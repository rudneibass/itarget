CREATE TABLE IF NOT EXISTS social.usuario (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_uuid TEXT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  apelido VARCHAR(120),
  url_avatar TEXT,
  hash_qr TEXT NOT NULL UNIQUE,
  moedas INTEGER NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_usuario_organizacao FOREIGN KEY (organizacao_uuid) REFERENCES social.organizacao(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_usuario_organizacao_uuid ON social.usuario (organizacao_uuid);
CREATE INDEX IF NOT EXISTS idx_social_usuario_hash_qr ON social.usuario (hash_qr);
