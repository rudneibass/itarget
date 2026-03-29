-- Seed de jogos para o módulo social
-- Requer o seed mínimo (001-seed-minimo-social.postgres.sql)

INSERT INTO social.jogo (
  uuid,
  organizacao_id,
  nome,
  descricao,
  url,
  custo_moedas,
  ativo
)
SELECT
  '44444444-4444-4444-4444-444444444441',
  (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  'Quiz Relâmpago',
  'Jogo rápido de perguntas e respostas.',
  'https://play2048.co/',
  15,
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.jogo WHERE uuid = '44444444-4444-4444-4444-444444444441'
);

INSERT INTO social.jogo (
  uuid,
  organizacao_id,
  nome,
  descricao,
  url,
  custo_moedas,
  ativo
)
SELECT
  '44444444-4444-4444-4444-444444444442',
  (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  'Hextris',
  'Encontre pares e ganhe pontos de memória.',
  'https://hextris.io/',
  20,
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.jogo WHERE uuid = '44444444-4444-4444-4444-444444444442'
);

INSERT INTO social.jogo (
  uuid,
  organizacao_id,
  nome,
  descricao,
  url,
  custo_moedas,
  ativo
)
SELECT
  '44444444-4444-4444-4444-444444444443',
  (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  'Desafio Matemático',
  'Resolva operações em tempo recorde.',
  'https://chromedino.com/',
  25,
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.jogo WHERE uuid = '44444444-4444-4444-4444-444444444443'
);

UPDATE social.jogo
SET
  organizacao_id = (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  nome = 'Quiz Relâmpago',
  descricao = 'Jogo rápido de perguntas e respostas.',
  url = 'https://play2048.co/',
  custo_moedas = 15,
  ativo = TRUE
WHERE uuid = '44444444-4444-4444-4444-444444444441';

UPDATE social.jogo
SET
  organizacao_id = (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  nome = 'Memória Criativa',
  descricao = 'Encontre pares e ganhe pontos de memória.',
  url = 'https://hextris.io/',
  custo_moedas = 20,
  ativo = TRUE
WHERE uuid = '44444444-4444-4444-4444-444444444442';

UPDATE social.jogo
SET
  organizacao_id = (SELECT id FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'),
  nome = 'Desafio Matemático',
  descricao = 'Resolva operações em tempo recorde.',
  url = 'https://chromedino.com/',
  custo_moedas = 25,
  ativo = TRUE
WHERE uuid = '44444444-4444-4444-4444-444444444443';

/*
INSERT INTO social.jogo ("uuid",organizacao_uuid,nome,descricao,url,custo_moedas,ativo,criado_em,alterado_em) VALUES
	 ('44444444-4444-4444-4444-444444444442','11111111-1111-1111-1111-111111111111','Hextris','...','https://hextris.io/',20,true,'2026-03-24 18:18:25.641101','2026-03-24 18:18:25.641101'),
	 ('44444444-4444-4444-4444-444444444441','11111111-1111-1111-1111-111111111111','dashmetry','...','https://dashmetry.io/',15,true,'2026-03-24 18:18:25.641101','2026-03-24 18:18:25.641101'),
	 ('75a1b4be-7f61-4911-84ec-9d9f47fbd468','11111111-1111-1111-1111-111111111111','Slither','...','http://slither.com/io',25,true,'2026-03-25 14:33:03.296079','2026-03-25 14:35:57.891301'),
	 ('4162e775-95f9-476f-b585-dae6a946e1d9','11111111-1111-1111-1111-111111111111','Slither','...','http://slither.com/io',25,false,'2026-03-25 14:36:21.463973','2026-03-25 14:36:21.463973'),
	 ('f1b3eb1c-6c17-4bc4-baca-867e8a8a0dea','11111111-1111-1111-1111-111111111111','minecraft v 1.8.8 [eaglecraft]','','https://eaglercraft.com/',10,true,'2026-03-25 16:37:04.568373','2026-03-25 16:38:08.496617'),
	 ('5762888b-3b6c-4731-9a70-65a951b18f86','11111111-1111-1111-1111-111111111111','snake game','','https://snakegame.org/',50,true,'2026-03-25 16:39:57.90251','2026-03-25 16:40:14.205856'),
	 ('d2284191-0495-4ca8-9e16-c1b7d86dc476','11111111-1111-1111-1111-111111111111','gd browser','','https://gdbrowser.com/',75,true,'2026-03-25 16:42:03.837972','2026-03-25 16:46:07.819406'),
	 ('f157dffe-c0c3-4b50-9594-3362058294e8','11111111-1111-1111-1111-111111111111','space waves','','https://spacewaves.io/',50,true,'2026-03-25 16:49:06.628691','2026-03-25 16:49:22.877241'),
	 ('fba4fd6f-aa94-470a-83b0-3264444f2743','11111111-1111-1111-1111-111111111111','bloxd',NULL,'https://bloxd.io/',0,true,'2026-03-25 17:15:22.199682','2026-03-26 21:11:02.031649');
*/      