CREATE TABLE IF NOT EXISTS social.perfil_instagram (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_id INTEGER NOT NULL,
  perfil VARCHAR(120) NOT NULL,
  categoria VARCHAR(120),
  conteudo VARCHAR(20) NOT NULL DEFAULT 'EXTERNO',
  escopo VARCHAR(20) NOT NULL DEFAULT 'PRIVADO',
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  destaque BOOLEAN NOT NULL DEFAULT FALSE,
  sincronizado_em TIMESTAMP DEFAULT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_social_perfil_instagram_org_perfil UNIQUE (organizacao_id, perfil),
  CONSTRAINT fk_social_perfil_instagram_organizacao FOREIGN KEY (organizacao_id) REFERENCES public.organizacao(id),
  CONSTRAINT ck_social_perfil_instagram_conteudo
    CHECK (conteudo IN ('EXTERNO', 'INTERNO', 'ANUNCIANTE')),
  CONSTRAINT ck_social_perfil_instagram_escopo
      CHECK (escopo IN ('PRIVADO', 'PUBLICO'))
);

CREATE INDEX IF NOT EXISTS idx_social_perfil_instagram_organizacao_id ON social.perfil_instagram (organizacao_id);
CREATE INDEX IF NOT EXISTS idx_social_perfil_instagram_perfil ON social.perfil_instagram (perfil);
