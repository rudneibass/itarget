CREATE TABLE IF NOT EXISTS social.arquivo (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  slug VARCHAR(255),
  entidade_pai VARCHAR(255) NOT NULL,
  entidade_pai_id INTEGER NOT NULL,
  nome VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  tamanho INTEGER NOT NULL,
  configuracao JSONB,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  criado_por_usuario_id INTEGER NOT NULL,
  alterado_por_usuario_id INTEGER NOT NULL,
  CONSTRAINT fk_criado_por_usuario FOREIGN KEY (criado_por_usuario_id) REFERENCES social.usuario (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_alterado_por_usuario FOREIGN KEY (alterado_por_usuario_id) REFERENCES social.usuario (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_arquivo_uuid ON social.arquivo (uuid);
