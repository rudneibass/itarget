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
