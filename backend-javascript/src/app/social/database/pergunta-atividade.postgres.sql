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
