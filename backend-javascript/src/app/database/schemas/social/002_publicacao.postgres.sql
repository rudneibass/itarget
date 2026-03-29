CREATE TABLE IF NOT EXISTS social.publicacao (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  tipo VARCHAR(30) NOT NULL,
  perfil VARCHAR(120) DEFAULT NULL,
  texto TEXT,
  midia_url TEXT,
  url_redirecionamento TEXT,
  titulo_redirecionamento VARCHAR(255),
  conteudo VARCHAR(20) NOT NULL DEFAULT 'EXTERNO',
  escopo VARCHAR(20) NOT NULL DEFAULT 'PRIVADO',
  destaque BOOLEAN NOT NULL DEFAULT FALSE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_publicacao_organizacao FOREIGN KEY (organizacao_id) REFERENCES public.organizacao(id),
  CONSTRAINT fk_social_publicacao_usuario FOREIGN KEY (usuario_id) REFERENCES social.usuario(id),
  CONSTRAINT ck_social_publicacao_conteudo
    CHECK (conteudo IN ('EXTERNO', 'INTERNO', 'ANUNCIANTE')),
  CONSTRAINT ck_social_publicacao_escopo
    CHECK (escopo IN ('PRIVADO', 'PUBLICO'))
);

CREATE INDEX IF NOT EXISTS idx_social_publicacao_organizacao_id ON social.publicacao (organizacao_id);
CREATE INDEX IF NOT EXISTS idx_social_publicacao_usuario_id ON social.publicacao (usuario_id);
CREATE INDEX IF NOT EXISTS idx_social_publicacao_criado_em ON social.publicacao (criado_em DESC);

CREATE TABLE IF NOT EXISTS social.comentario_publicacao (
  id SERIAL PRIMARY KEY,
  publicacao_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  comentario TEXT NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_comentario_publicacao_post FOREIGN KEY (publicacao_id) REFERENCES social.publicacao(id),
  CONSTRAINT fk_social_comentario_publicacao_usuario FOREIGN KEY (usuario_id) REFERENCES social.usuario(id)
);

CREATE INDEX IF NOT EXISTS idx_social_comentario_publicacao_publicacao_id ON social.comentario_publicacao (publicacao_id);

CREATE TABLE IF NOT EXISTS social.compartilhamento_publicacao (
  id SERIAL PRIMARY KEY,
  publicacao_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_compartilhamento_publicacao_post FOREIGN KEY (publicacao_id) REFERENCES social.publicacao(id),
  CONSTRAINT fk_social_compartilhamento_publicacao_usuario FOREIGN KEY (usuario_id) REFERENCES social.usuario(id)
);

CREATE INDEX IF NOT EXISTS idx_social_compartilhamento_publicacao_publicacao_id ON social.compartilhamento_publicacao (publicacao_id);


CREATE TABLE IF NOT EXISTS social.curtida_publicacao (
  id SERIAL PRIMARY KEY,
  publicacao_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_social_curtida_publicacao UNIQUE (publicacao_id, usuario_id),
  CONSTRAINT fk_social_curtida_publicacao_post FOREIGN KEY (publicacao_id) REFERENCES social.publicacao(id),
  CONSTRAINT fk_social_curtida_publicacao_usuario FOREIGN KEY (usuario_id) REFERENCES social.usuario(id)
);

CREATE INDEX IF NOT EXISTS idx_social_curtida_publicacao_publicacao_id ON social.curtida_publicacao (publicacao_id);
