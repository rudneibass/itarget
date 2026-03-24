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

CREATE TABLE IF NOT EXISTS social.compartilhamento_publicacao (
  id SERIAL PRIMARY KEY,
  publicacao_uuid TEXT NOT NULL,
  usuario_uuid TEXT NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_compartilhamento_publicacao_post FOREIGN KEY (publicacao_uuid) REFERENCES social.publicacao(uuid),
  CONSTRAINT fk_social_compartilhamento_publicacao_usuario FOREIGN KEY (usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_compartilhamento_publicacao_publicacao_uuid ON social.compartilhamento_publicacao (publicacao_uuid);


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
