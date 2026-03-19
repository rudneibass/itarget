-- Seed de atividades para o módulo social
-- Requer o seed mínimo (001-seed-minimo-social.postgres.sql)

INSERT INTO social.atividade (
  uuid,
  organizacao_uuid,
  titulo,
  descricao,
  moedas_por_acerto,
  ativo
)
SELECT
  '55555555-5555-5555-5555-555555555551',
  '11111111-1111-1111-1111-111111111111',
  'Português Básico',
  'Perguntas rápidas sobre ortografia.',
  2,
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.atividade WHERE uuid = '55555555-5555-5555-5555-555555555551'
);

INSERT INTO social.atividade (
  uuid,
  organizacao_uuid,
  titulo,
  descricao,
  moedas_por_acerto,
  ativo
)
SELECT
  '55555555-5555-5555-5555-555555555552',
  '11111111-1111-1111-1111-111111111111',
  'Ciências do Dia a Dia',
  'Conceitos simples de ciência para revisar.',
  3,
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.atividade WHERE uuid = '55555555-5555-5555-5555-555555555552'
);

INSERT INTO social.atividade (
  uuid,
  organizacao_uuid,
  titulo,
  descricao,
  moedas_por_acerto,
  ativo
)
SELECT
  '55555555-5555-5555-5555-555555555553',
  '11111111-1111-1111-1111-111111111111',
  'Raciocínio Lógico',
  'Sequências e lógica para aquecer o cérebro.',
  4,
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.atividade WHERE uuid = '55555555-5555-5555-5555-555555555553'
);

UPDATE social.atividade
SET
  organizacao_uuid = '11111111-1111-1111-1111-111111111111',
  titulo = 'Português Básico',
  descricao = 'Perguntas rápidas sobre ortografia.',
  moedas_por_acerto = 2,
  ativo = TRUE
WHERE uuid = '55555555-5555-5555-5555-555555555551';

UPDATE social.atividade
SET
  organizacao_uuid = '11111111-1111-1111-1111-111111111111',
  titulo = 'Ciências do Dia a Dia',
  descricao = 'Conceitos simples de ciência para revisar.',
  moedas_por_acerto = 3,
  ativo = TRUE
WHERE uuid = '55555555-5555-5555-5555-555555555552';

UPDATE social.atividade
SET
  organizacao_uuid = '11111111-1111-1111-1111-111111111111',
  titulo = 'Raciocínio Lógico',
  descricao = 'Sequências e lógica para aquecer o cérebro.',
  moedas_por_acerto = 4,
  ativo = TRUE
WHERE uuid = '55555555-5555-5555-5555-555555555553';

INSERT INTO social.pergunta_atividade (atividade_uuid, ordem, pergunta, resposta_correta)
SELECT '55555555-5555-5555-5555-555555555551', 1, 'Qual palavra está correta: exceção ou excessão?', 'exceção'
WHERE NOT EXISTS (
  SELECT 1 FROM social.pergunta_atividade
  WHERE atividade_uuid = '55555555-5555-5555-5555-555555555551' AND ordem = 1
);

INSERT INTO social.pergunta_atividade (atividade_uuid, ordem, pergunta, resposta_correta)
SELECT '55555555-5555-5555-5555-555555555551', 2, 'Complete: Eu ____ estudar hoje. (vou/vô)', 'vou'
WHERE NOT EXISTS (
  SELECT 1 FROM social.pergunta_atividade
  WHERE atividade_uuid = '55555555-5555-5555-5555-555555555551' AND ordem = 2
);

INSERT INTO social.pergunta_atividade (atividade_uuid, ordem, pergunta, resposta_correta)
SELECT '55555555-5555-5555-5555-555555555552', 1, 'A água ferve em quantos graus Celsius ao nível do mar?', '100'
WHERE NOT EXISTS (
  SELECT 1 FROM social.pergunta_atividade
  WHERE atividade_uuid = '55555555-5555-5555-5555-555555555552' AND ordem = 1
);

INSERT INTO social.pergunta_atividade (atividade_uuid, ordem, pergunta, resposta_correta)
SELECT '55555555-5555-5555-5555-555555555552', 2, 'Plantas produzem seu alimento em qual processo?', 'fotossíntese'
WHERE NOT EXISTS (
  SELECT 1 FROM social.pergunta_atividade
  WHERE atividade_uuid = '55555555-5555-5555-5555-555555555552' AND ordem = 2
);

INSERT INTO social.pergunta_atividade (atividade_uuid, ordem, pergunta, resposta_correta)
SELECT '55555555-5555-5555-5555-555555555553', 1, 'Qual número completa a sequência: 2, 4, 8, 16, ?', '32'
WHERE NOT EXISTS (
  SELECT 1 FROM social.pergunta_atividade
  WHERE atividade_uuid = '55555555-5555-5555-5555-555555555553' AND ordem = 1
);

INSERT INTO social.pergunta_atividade (atividade_uuid, ordem, pergunta, resposta_correta)
SELECT '55555555-5555-5555-5555-555555555553', 2, 'Se todos os A são B e todos os B são C, então todos os A são?', 'c'
WHERE NOT EXISTS (
  SELECT 1 FROM social.pergunta_atividade
  WHERE atividade_uuid = '55555555-5555-5555-5555-555555555553' AND ordem = 2
);
