CREATE TABLE IF NOT EXISTS social.comentario_publicacao (
  id SERIAL PRIMARY KEY,
  publicacao_uuid TEXT NOT NULL,
  usuario_uuid TEXT NOT NULL,
  comentario TEXT NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_comentario_publicacao_post FOREIGN KEY (publicacao_uuid) REFERENCES social.publicacao(uuid),
  CONSTRAINT fk_social_comentario_publicacao_usuario FOREIGN KEY (usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_comentario_publicacao_publicacao_uuid ON social.comentario_publicacao (publicacao_uuid);
