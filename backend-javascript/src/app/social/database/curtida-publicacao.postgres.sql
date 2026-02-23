CREATE TABLE IF NOT EXISTS social.curtida_publicacao (
  id SERIAL PRIMARY KEY,
  publicacao_uuid TEXT NOT NULL,
  usuario_uuid TEXT NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_social_curtida_publicacao UNIQUE (publicacao_uuid, usuario_uuid),
  CONSTRAINT fk_social_curtida_publicacao_post FOREIGN KEY (publicacao_uuid) REFERENCES social.publicacao(uuid),
  CONSTRAINT fk_social_curtida_publicacao_usuario FOREIGN KEY (usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_curtida_publicacao_publicacao_uuid ON social.curtida_publicacao (publicacao_uuid);
