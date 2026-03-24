CREATE TABLE IF NOT EXISTS social.conversa (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL UNIQUE,
  organizacao_uuid TEXT NOT NULL,
  criado_por_usuario_uuid TEXT NOT NULL,
  titulo VARCHAR(255),
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_conversa_organizacao FOREIGN KEY (organizacao_uuid) REFERENCES social.organizacao(uuid),
  CONSTRAINT fk_social_conversa_usuario FOREIGN KEY (criado_por_usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_conversa_organizacao_uuid ON social.conversa (organizacao_uuid);

CREATE TABLE IF NOT EXISTS social.participante_conversa (
  id SERIAL PRIMARY KEY,
  conversa_uuid TEXT NOT NULL,
  usuario_uuid TEXT NOT NULL,
  entrou_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_social_participante_conversa UNIQUE (conversa_uuid, usuario_uuid),
  CONSTRAINT fk_social_participante_conversa_thread FOREIGN KEY (conversa_uuid) REFERENCES social.conversa(uuid),
  CONSTRAINT fk_social_participante_conversa_usuario FOREIGN KEY (usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_participante_conversa_usuario_uuid ON social.participante_conversa (usuario_uuid);

CREATE TABLE IF NOT EXISTS social.mensagem_conversa (
  id SERIAL PRIMARY KEY,
  conversa_uuid TEXT NOT NULL,
  usuario_uuid TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_mensagem_conversa_thread FOREIGN KEY (conversa_uuid) REFERENCES social.conversa(uuid),
  CONSTRAINT fk_social_mensagem_conversa_usuario FOREIGN KEY (usuario_uuid) REFERENCES social.usuario(uuid)
);

CREATE INDEX IF NOT EXISTS idx_social_mensagem_conversa_conversa_uuid ON social.mensagem_conversa (conversa_uuid);
