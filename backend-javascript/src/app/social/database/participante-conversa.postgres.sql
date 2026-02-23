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
