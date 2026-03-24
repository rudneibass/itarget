CREATE TABLE IF NOT EXISTS social.recompensa (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_uuid TEXT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  tipo VARCHAR(120) NOT NULL,
  custo_moedas INTEGER NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_recompensa_organizacao FOREIGN KEY (organizacao_uuid) REFERENCES social.organizacao(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_recompensa_organizacao_uuid ON social.recompensa (organizacao_uuid);

CREATE TABLE IF NOT EXISTS social.resgate_recompensa (
  id SERIAL PRIMARY KEY,
  recompensa_uuid TEXT NOT NULL,
  usuario_uuid TEXT NOT NULL,
  custo_moedas INTEGER NOT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'pendente',
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_resgate_recompensa_recompensa FOREIGN KEY (recompensa_uuid) REFERENCES social.recompensa(uuid),
  CONSTRAINT fk_social_resgate_recompensa_usuario FOREIGN KEY (usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_resgate_recompensa_usuario_uuid ON social.resgate_recompensa (usuario_uuid);
