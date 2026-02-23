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
