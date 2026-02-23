CREATE TABLE IF NOT EXISTS social.permissao_usuario (
  id SERIAL PRIMARY KEY,
  usuario_uuid TEXT NOT NULL UNIQUE,
  pode_postar_midia BOOLEAN NOT NULL DEFAULT FALSE,
  pode_postar_link BOOLEAN NOT NULL DEFAULT FALSE,
  criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  alterado_em TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_social_permissao_usuario_user FOREIGN KEY (usuario_uuid) REFERENCES social.usuario(uuid)
);
