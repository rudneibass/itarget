-- Seed mínimo para acesso ao módulo social
-- URL após execução:
-- /social/access/11111111-1111-1111-1111-111111111111/hash-usuario-demo-social

INSERT INTO social.usuario (
  uuid,
  organizacao_id,
  nome,
  apelido,
  url_avatar,
  hash_qr,
  moedas,
  ativo
)
SELECT
  '22222222-2222-2222-2222-222222222222',
  (SELECT id FROM public.organizacao WHERE id = 1),
  'Usuario Demo Social',
  'Demo',
  NULL,
  'hash-usuario-demo-social',
  150,
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222'
);

UPDATE social.usuario
SET
  organizacao_id = (SELECT id FROM public.organizacao WHERE id = 1),
  nome = 'Usuario Demo Social',
  apelido = 'Demo',
  url_avatar = NULL,
  hash_qr = 'hash-usuario-demo-social',
  moedas = 150,
  ativo = TRUE
WHERE uuid = '22222222-2222-2222-2222-222222222222';

INSERT INTO social.permissao_usuario (
  usuario_id,
  pode_postar_midia,
  pode_postar_link
)
SELECT
  (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222'),
  TRUE,
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.permissao_usuario WHERE usuario_id = (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222')
);

UPDATE social.permissao_usuario
SET
  pode_postar_midia = TRUE,
  pode_postar_link = TRUE
WHERE usuario_id = (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222');
