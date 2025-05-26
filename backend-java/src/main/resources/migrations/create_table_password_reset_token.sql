CREATE TABLE password_reset_tokens (
    id serial NOT NULL,
    token VARCHAR(255) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    expiration_time BIGINT NOT NULL
);