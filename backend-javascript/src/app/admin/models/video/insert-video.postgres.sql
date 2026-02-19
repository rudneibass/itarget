INSERT INTO video (
  uuid,
  criado_em,
  alterao_em,
  criado_por,
  alterado_por,
  data,
  url,
  titulo,
  descricao,
  imagem
)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'admin',
    'admin',
    '2026-02-01',
    'https://www.youtube.com/watch?v=abc123',
    'Introdução ao Painel Administrativo',
    'Vídeo de introdução com visão geral do sistema administrativo.',
    'intro-admin.png'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'admin',
    'editor',
    '2026-02-05',
    'https://www.youtube.com/watch?v=def456',
    'Como cadastrar publicações',
    'Tutorial de cadastro e edição de publicações no painel.',
    'cadastro-publicacoes.png'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'editor',
    'editor',
    '2026-02-10',
    'https://vimeo.com/123456789',
    'Gerenciamento de vídeos',
    'Guia completo para criação, atualização e remoção de vídeos.',
    'gestao-videos.png'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    'admin',
    'admin',
    '2026-02-15',
    'https://www.youtube.com/watch?v=ghi789',
    'Configurações gerais do sistema',
    'Passo a passo das configurações disponíveis no módulo administrativo.',
    'configuracoes-gerais.png'
  );
