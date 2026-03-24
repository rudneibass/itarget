-- Seed mínimo para acesso ao módulo social
-- URL após execução:
-- /social/access/11111111-1111-1111-1111-111111111111/hash-usuario-demo-social

INSERT INTO public.organizacao (uuid, nome, slug, ativo)
SELECT
  '11111111-1111-1111-1111-111111111111',
  'Organizacao Demo Social',
  'organizacao-demo-social',
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM public.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'
);

UPDATE public.organizacao
SET
  nome = 'Organizacao Demo Social',
  slug = 'organizacao-demo-social',
  ativo = TRUE
WHERE uuid = '11111111-1111-1111-1111-111111111111';


INSERT INTO social.organizacao (uuid, nome, slug, ativo)
SELECT
  '11111111-1111-1111-1111-111111111111',
  'Organizacao Demo Social',
  'organizacao-demo-social',
  TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM social.organizacao WHERE uuid = '11111111-1111-1111-1111-111111111111'
);

UPDATE social.organizacao
SET
  nome = 'Organizacao Demo Social',
  slug = 'organizacao-demo-social',
  ativo = TRUE
WHERE uuid = '11111111-1111-1111-1111-111111111111';
