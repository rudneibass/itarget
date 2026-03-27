CREATE TABLE IF NOT EXISTS social.perfil_instagram (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_id INTEGER NOT NULL,
  perfil VARCHAR(120) NOT NULL,
  categoria VARCHAR(120),
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_social_perfil_instagram_org_perfil UNIQUE (organizacao_id, perfil),
  CONSTRAINT fk_social_perfil_instagram_organizacao FOREIGN KEY (organizacao_id) REFERENCES public.organizacao(id)
);

CREATE INDEX IF NOT EXISTS idx_social_perfil_instagram_organizacao_id ON social.perfil_instagram (organizacao_id);
CREATE INDEX IF NOT EXISTS idx_social_perfil_instagram_perfil ON social.perfil_instagram (perfil);
