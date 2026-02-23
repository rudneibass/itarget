CREATE TABLE IF NOT EXISTS social.publicacao (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_uuid TEXT NOT NULL,
  usuario_uuid TEXT NOT NULL,
  tipo VARCHAR(30) NOT NULL,
  texto TEXT,
  midia_url TEXT,
  url_redirecionamento TEXT,
  titulo_redirecionamento VARCHAR(255),
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_publicacao_organizacao FOREIGN KEY (organizacao_uuid) REFERENCES social.organizacao(uuid),
  CONSTRAINT fk_social_publicacao_usuario FOREIGN KEY (usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_publicacao_organizacao_uuid ON social.publicacao (organizacao_uuid);
CREATE INDEX IF NOT EXISTS idx_social_publicacao_usuario_uuid ON social.publicacao (usuario_uuid);
CREATE INDEX IF NOT EXISTS idx_social_publicacao_criado_em ON social.publicacao (criado_em DESC);
