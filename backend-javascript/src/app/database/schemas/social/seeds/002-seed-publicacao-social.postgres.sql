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
  conteudo,
  escopo,
  destaque,
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
  'EXTERNO',
  'PUBLICO',
  FALSE,
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
  conteudo,
  escopo,
  destaque,
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
  'EXTERNO',
  'PUBLICO',
  FALSE,
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
  conteudo,
  escopo,
  destaque,
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
  'INTERNO',
  'PRIVADO',
  FALSE,
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
  conteudo,
  escopo,
  destaque,
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
  'ANUNCIANTE',
  'PUBLICO',
  TRUE,
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

/*
INSERT INTO social.publicacao ("uuid",organizacao_id,usuario_id,tipo,perfil,texto,midia_url,url_redirecionamento,titulo_redirecionamento,conteudo,escopo,destaque,criado_em) VALUES
	 ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',1,1,'texto',NULL,'Bem-vindos à rede social da organização! 🎉',NULL,NULL,NULL,'EXTERNO','PUBLICO',false,'2026-03-28 22:52:00.038298'),
	 ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',1,1,'emoji',NULL,'Dia produtivo por aqui 😄🚀',NULL,NULL,NULL,'EXTERNO','PUBLICO',false,'2026-03-28 23:02:00.038298'),
	 ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3',1,2,'imagem',NULL,'Registro do evento interno de hoje 📸','https://images.unsplash.com/photo-1521737604893-d14cc237f11d',NULL,NULL,'INTERNO','PRIVADO',false,'2026-03-28 23:12:00.038298'),
	 ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4',1,2,'video',NULL,'Compartilhando um vídeo com dicas de produtividade.','https://samplelib.com/lib/preview/mp4/sample-5s.mp4','https://www.example.com/produtividade','Dicas de produtividade','ANUNCIANTE','PUBLICO',true,'2026-03-28 23:22:00.038298'),
	 ('5732787f-64f4-4900-b393-633278ed13b9',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DOrHV9PjXw9/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.772283'),
	 ('5e2a2933-1d6a-4ac4-9d43-fa19192fb505',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DV-6q0QkTWw/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.791705'),
	 ('a247af9c-ef40-4571-906d-285c5d206838',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DWcM0aFkWI3/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.805342'),
	 ('6efd6ed5-e1ac-4e98-a8bb-17c2591dddcf',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DWSE0TEkTvN/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.821363'),
	 ('657be5ed-1193-4e5a-9948-ec27ff641410',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DU1aR3rkSUg/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.841129'),
	 ('f3f3f4e9-979f-4330-a050-420e7ba51924',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DTz7lLbERe1/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.85138');
INSERT INTO social.publicacao ("uuid",organizacao_id,usuario_id,tipo,perfil,texto,midia_url,url_redirecionamento,titulo_redirecionamento,conteudo,escopo,destaque,criado_em) VALUES
	 ('2b88f6de-4ec4-473c-8c7a-e45c90bc5e38',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DTQrntbjAaM/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.864487'),
	 ('8c2a8c44-37cb-404d-a7ab-7b98d6b3f0da',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DTK2nXxlpT4/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.876238'),
	 ('45ddcbcb-ad57-467d-9ef7-597010882201',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DSrxkkHgVU_/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.887187'),
	 ('512c87bd-d95f-4fdf-9b6b-1da4875d180b',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DSp83k4F0UK/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.898426'),
	 ('35812a7d-8239-4385-8a22-0d8fc9f690be',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DScyAyogB6N/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.911388'),
	 ('ea165ef4-fbb0-44ec-a9b3-bfaf56e948b0',1,1,'instagram','educandario.n.s.fatima','Post do Instagram @educandario.n.s.fatima','https://www.instagram.com/p/DSaLhYTCYuU/',NULL,'humor','INTERNO','PRIVADO',false,'2026-03-29 02:47:04.921347'),
	 ('8e6a5fbe-f509-4c55-9f3a-7c3c178a4097',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWWTtq-jh0M/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.54581'),
	 ('f1c6da84-5a70-47e8-980d-ee16b58b9ea6',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWSiQJKjQ6X/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.563524'),
	 ('04c19eda-4ece-4c01-bce1-2e35d9b2d451',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWFJN8Bj6Lp/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.576489'),
	 ('8644d1de-4620-437b-a27d-ee4dcc12a6e3',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWcwtlXDXm8/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.591063');
INSERT INTO social.publicacao ("uuid",organizacao_id,usuario_id,tipo,perfil,texto,midia_url,url_redirecionamento,titulo_redirecionamento,conteudo,escopo,destaque,criado_em) VALUES
	 ('9f2378bc-bde8-4825-8e08-675968f480ce',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWcdZXeD1RQ/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.603828'),
	 ('8c5eba1b-846a-45c1-885b-904f9534bdc1',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWcL3LND84f/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.618303'),
	 ('2143134d-4425-433e-bd58-87d84155ca0c',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWb0XtijkmB/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.632341'),
	 ('688ad1e2-d17d-4acc-973c-8b752bf8d2d8',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWbj0y4jrbB/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.646876'),
	 ('9054eaf5-27af-45ab-8c7a-6a0c29dcd5fb',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWbaXwhDnHj/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.658767'),
	 ('7e8951bf-1787-4515-ab09-ec14672f92bd',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWaS1DUDSwz/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.672859'),
	 ('d3eda4b2-60be-4eb2-9a55-e7283f1b655a',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWaIsitDWyc/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.685939'),
	 ('7fb60cab-27e5-4070-a91c-4ce5c732ca33',1,1,'instagram','clubedaresenhaofc','Post do Instagram @clubedaresenhaofc','https://www.instagram.com/p/DWZpgPZj4Sc/',NULL,'humor','EXTERNO','PUBLICO',false,'2026-03-29 02:58:10.700715');
*/