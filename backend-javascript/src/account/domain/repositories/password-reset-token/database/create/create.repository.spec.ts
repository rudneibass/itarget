import { CreateRepository } from './create.repository';
import { PasswordResetToken } from '@src/account/domain/entities/password-reset-token/password.reset.token.entity';
import { PasswordResetTokenDto } from '@src/account/domain/entities/password-reset-token/password.reset.token.dto';
import { DatabaseAdapter } from '@src/account/infra/adapters/database/database.adapter';

describe('CreateRepository - Integração (Postgres)', () => {
  let db: DatabaseAdapter;
  let repository: CreateRepository;

  beforeAll(() => {
    db = new DatabaseAdapter();
    repository = new CreateRepository(db);
  });

  afterAll(async () => { await db.close() });

  beforeEach(async () => { await db.query('DELETE FROM password_reset_token') });

  const makeEntity = () =>
    new PasswordResetToken(
      new PasswordResetTokenDto({
          userId: 10,
          tokenHash: "HASHED_123",
          expiresAt: "2035-01-01T00:00:00Z",
      })
    );

  it('deve persistir no banco e retornar o id real', async () => {
    const entity = makeEntity();
    const result = await repository.handle(entity);
    expect(result.id).toBeDefined();

    const rows = await db.query('SELECT * FROM password_reset_token WHERE id = $1', [result.id]);
    expect(rows).toHaveLength(1);
    expect(rows[0].user_id).toBe(10);
    expect(rows[0].token_hash).toBe("HASHED_123");
    expect(new Date(rows[0].expires_at).toISOString()).toBe(
      "2035-01-01T00:00:00.000Z"
    );
  });
});
