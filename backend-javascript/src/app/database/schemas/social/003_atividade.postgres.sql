CREATE TABLE IF NOT EXISTS social.atividade (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_uuid TEXT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  moedas_por_acerto INTEGER NOT NULL DEFAULT 1,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_atividade_organizacao FOREIGN KEY (organizacao_uuid) REFERENCES social.organizacao(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_atividade_organizacao_uuid ON social.atividade (organizacao_uuid);

CREATE TABLE IF NOT EXISTS social.pergunta_atividade (
  id SERIAL PRIMARY KEY,
  atividade_uuid TEXT NOT NULL,
  ordem INTEGER NOT NULL,
  pergunta TEXT NOT NULL,
  resposta_correta TEXT NOT NULL,
  CONSTRAINT fk_social_pergunta_atividade_atividade FOREIGN KEY (atividade_uuid) REFERENCES social.atividade(uuid),
  CONSTRAINT uq_social_pergunta_atividade_ordem UNIQUE (atividade_uuid, ordem)
);

CREATE INDEX IF NOT EXISTS idx_social_pergunta_atividade_atividade_uuid ON social.pergunta_atividade (atividade_uuid);

CREATE TABLE IF NOT EXISTS social.tentativa_atividade (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  atividade_uuid TEXT NOT NULL,
  usuario_uuid TEXT NOT NULL,
  indice_pergunta INTEGER NOT NULL DEFAULT 0,
  pergunta_iniciada_em TIMESTAMP,
  acertos INTEGER NOT NULL DEFAULT 0,
  moedas_ganhas INTEGER NOT NULL DEFAULT 0,
  concluido BOOLEAN NOT NULL DEFAULT FALSE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_tentativa_atividade_atividade FOREIGN KEY (atividade_uuid) REFERENCES social.atividade(uuid),
  CONSTRAINT fk_social_tentativa_atividade_usuario FOREIGN KEY (usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_tentativa_atividade_usuario_uuid ON social.tentativa_atividade (usuario_uuid);
