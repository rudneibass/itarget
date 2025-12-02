-- ===========================================================
-- ORGANIZATION
-- ===========================================================
CREATE TABLE public.organization (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    slug            VARCHAR(255) UNIQUE NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP NOT NULL DEFAULT now()
);

-- ===========================================================
-- USER (usuário global)
-- ===========================================================
CREATE TABLE public.user (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   TEXT NOT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP NOT NULL DEFAULT now()
);

-- ===========================================================
-- ORGANIZATION_USER (pivot)
-- ===========================================================
CREATE TABLE organization_user (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES organization(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member'
);

CREATE UNIQUE INDEX idx_org_user_unique
    ON organization_user (organization_id, user_id);

-- ===========================================================
-- WORKSPACE
-- ===========================================================
CREATE TABLE public.workspace (
    id                BIGSERIAL PRIMARY KEY,
    organization_id   BIGINT NOT NULL,
    name              VARCHAR(255) NOT NULL,
    slug              VARCHAR(255) NOT NULL,
    created_at        TIMESTAMP NOT NULL DEFAULT now(),
    updated_at        TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_workspace_org
        FOREIGN KEY (organization_id)
        REFERENCES public.organization(id)
        ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_workspace_slug_per_org
    ON public.workspace (organization_id, slug);

-- ===========================================================
-- WORKSPACE_USER (pivot)
-- ===========================================================
CREATE TABLE public.workspace_user (
    id              BIGSERIAL PRIMARY KEY,
    workspace_id    BIGINT NOT NULL,
    user_id         BIGINT NOT NULL,
    role            VARCHAR(50) DEFAULT 'member',
    created_at      TIMESTAMP NOT NULL DEFAULT now(),

    CONSTRAINT fk_wu_workspace
        FOREIGN KEY (workspace_id)
        REFERENCES public.workspace(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_wu_user
        FOREIGN KEY (user_id)
        REFERENCES public.user(id)
        ON DELETE CASCADE
);

-- Usuário não pode estar duas vezes no mesmo workspace
CREATE UNIQUE INDEX idx_workspace_user_unique
    ON public.workspace_user(workspace_id, user_id);


CREATE TABLE password_reset_token (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "user"(id),
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
