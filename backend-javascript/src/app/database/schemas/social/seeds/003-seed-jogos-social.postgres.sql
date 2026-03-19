-- Seed de jogos para o módulo social
-- Requer o seed mínimo (001-seed-minimo-social.postgres.sql)

INSERT INTO social.jogo (
  uuid,
  organizacao_uuid,
  nome,
  descricao,
  url,
  custo_moedas,
  ativo
)
SELECT
  '44444444-4444-4444-4444-444444444441',
  '11111111-1111-1111-1111-111111111111',
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
  organizacao_uuid,
  nome,
  descricao,
  url,
  custo_moedas,
  ativo
)
SELECT
  '44444444-4444-4444-4444-444444444442',
  '11111111-1111-1111-1111-111111111111',
  'Memória Criativa',
  'Encontre pares e ganhe pontos de memória.',
  'https://hextris.io/',
  20,
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.jogo WHERE uuid = '44444444-4444-4444-4444-444444444442'
);

INSERT INTO social.jogo (
  uuid,
  organizacao_uuid,
  nome,
  descricao,
  url,
  custo_moedas,
  ativo
)
SELECT
  '44444444-4444-4444-4444-444444444443',
  '11111111-1111-1111-1111-111111111111',
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
  organizacao_uuid = '11111111-1111-1111-1111-111111111111',
  nome = 'Quiz Relâmpago',
  descricao = 'Jogo rápido de perguntas e respostas.',
  url = 'https://play2048.co/',
  custo_moedas = 15,
  ativo = TRUE
WHERE uuid = '44444444-4444-4444-4444-444444444441';

UPDATE social.jogo
SET
  organizacao_uuid = '11111111-1111-1111-1111-111111111111',
  nome = 'Memória Criativa',
  descricao = 'Encontre pares e ganhe pontos de memória.',
  url = 'https://hextris.io/',
  custo_moedas = 20,
  ativo = TRUE
WHERE uuid = '44444444-4444-4444-4444-444444444442';

UPDATE social.jogo
SET
  organizacao_uuid = '11111111-1111-1111-1111-111111111111',
  nome = 'Desafio Matemático',
  descricao = 'Resolva operações em tempo recorde.',
  url = 'https://chromedino.com/',
  custo_moedas = 25,
  ativo = TRUE
WHERE uuid = '44444444-4444-4444-4444-444444444443';
