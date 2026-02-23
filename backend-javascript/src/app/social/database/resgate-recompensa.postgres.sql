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
