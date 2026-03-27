-- Seed de timeline para o módulo social
-- Requer o seed mínimo (001-seed-minimo-social.postgres.sql) já aplicado

-- Usuário extra para gerar interações na timeline
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
  '33333333-3333-3333-3333-333333333333',
  (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  'Usuario Interacao Social',
  'Interacao',
  NULL,
  'hash-usuario-interacao-social',
  90,
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333'
);

UPDATE social.usuario
SET
  organizacao_id = (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  nome = 'Usuario Interacao Social',
  apelido = 'Interacao',
  url_avatar = NULL,
  hash_qr = 'hash-usuario-interacao-social',
  moedas = 90,
  ativo = TRUE
WHERE uuid = '33333333-3333-3333-3333-333333333333';

INSERT INTO social.permissao_usuario (usuario_id, pode_postar_midia, pode_postar_link)
SELECT (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333'), TRUE, TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.permissao_usuario WHERE usuario_id = (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333')
);

UPDATE social.permissao_usuario
SET
  pode_postar_midia = TRUE,
  pode_postar_link = TRUE
WHERE usuario_id = (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333');

-- Postagens da timeline
INSERT INTO social.publicacao (
  uuid,
  organizacao_id,
  usuario_id,
  tipo,
  texto,
  midia_url,
  url_redirecionamento,
  titulo_redirecionamento,
  criado_em
)
SELECT
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
  (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222'),
  'texto',
  'Bem-vindos à rede social da organização! 🎉',
  NULL,
  NULL,
  NULL,
  NOW() - INTERVAL '40 minutes'
WHERE NOT EXISTS (
  SELECT 1 FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1'
);

INSERT INTO social.publicacao (
  uuid,
  organizacao_id,
  usuario_id,
  tipo,
  texto,
  midia_url,
  url_redirecionamento,
  titulo_redirecionamento,
  criado_em
)
SELECT
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
  (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222'),
  'emoji',
  'Dia produtivo por aqui 😄🚀',
  NULL,
  NULL,
  NULL,
  NOW() - INTERVAL '30 minutes'
WHERE NOT EXISTS (
  SELECT 1 FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2'
);

INSERT INTO social.publicacao (
  uuid,
  organizacao_id,
  usuario_id,
  tipo,
  texto,
  midia_url,
  url_redirecionamento,
  titulo_redirecionamento,
  criado_em
)
SELECT
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3',
  (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333'),
  'imagem',
  'Registro do evento interno de hoje 📸',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
  NULL,
  NULL,
  NOW() - INTERVAL '20 minutes'
WHERE NOT EXISTS (
  SELECT 1 FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3'
);

INSERT INTO social.publicacao (
  uuid,
  organizacao_id,
  usuario_id,
  tipo,
  texto,
  midia_url,
  url_redirecionamento,
  titulo_redirecionamento,
  criado_em
)
SELECT
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4',
  (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333'),
  'video',
  'Compartilhando um vídeo com dicas de produtividade.',
  'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  'https://www.example.com/produtividade',
  'Dicas de produtividade',
  NOW() - INTERVAL '10 minutes'
WHERE NOT EXISTS (
  SELECT 1 FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4'
);

-- Comentários
INSERT INTO social.comentario_publicacao (publicacao_id, usuario_id, comentario)
SELECT
  (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1'),
  (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333'),
  'Boa! Vamos nessa!'
WHERE NOT EXISTS (
  SELECT 1 FROM social.comentario_publicacao
  WHERE publicacao_id = (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1')
    AND usuario_id = (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333')
    AND comentario = 'Boa! Vamos nessa!'
);

INSERT INTO social.comentario_publicacao (publicacao_id, usuario_id, comentario)
SELECT
  (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3'),
  (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222'),
  'Foto muito boa 👏'
WHERE NOT EXISTS (
  SELECT 1 FROM social.comentario_publicacao
  WHERE publicacao_id = (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3')
    AND usuario_id = (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222')
    AND comentario = 'Foto muito boa 👏'
);

-- Curtidas
INSERT INTO social.curtida_publicacao (publicacao_id, usuario_id)
SELECT
  (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1'),
  (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333')
WHERE NOT EXISTS (
  SELECT 1 FROM social.curtida_publicacao
  WHERE publicacao_id = (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1')
    AND usuario_id = (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333')
);

INSERT INTO social.curtida_publicacao (publicacao_id, usuario_id)
SELECT
  (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3'),
  (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222')
WHERE NOT EXISTS (
  SELECT 1 FROM social.curtida_publicacao
  WHERE publicacao_id = (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3')
    AND usuario_id = (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222')
);

-- Compartilhamentos
INSERT INTO social.compartilhamento_publicacao (publicacao_id, usuario_id)
SELECT
  (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2'),
  (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333')
WHERE NOT EXISTS (
  SELECT 1 FROM social.compartilhamento_publicacao
  WHERE publicacao_id = (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2')
    AND usuario_id = (SELECT id FROM social.usuario WHERE uuid = '33333333-3333-3333-3333-333333333333')
);

INSERT INTO social.compartilhamento_publicacao (publicacao_id, usuario_id)
SELECT
  (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4'),
  (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222')
WHERE NOT EXISTS (
  SELECT 1 FROM social.compartilhamento_publicacao
  WHERE publicacao_id = (SELECT id FROM social.publicacao WHERE uuid = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4')
    AND usuario_id = (SELECT id FROM social.usuario WHERE uuid = '22222222-2222-2222-2222-222222222222')
);
