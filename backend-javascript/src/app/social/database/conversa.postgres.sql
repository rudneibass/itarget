CREATE TABLE IF NOT EXISTS social.conversa (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_uuid TEXT NOT NULL,
  criado_por_usuario_uuid TEXT NOT NULL,
  titulo VARCHAR(255),
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_conversa_organizacao FOREIGN KEY (organizacao_uuid) REFERENCES social.organizacao(uuid),
  CONSTRAINT fk_social_conversa_usuario FOREIGN KEY (criado_por_usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_conversa_organizacao_uuid ON social.conversa (organizacao_uuid);
