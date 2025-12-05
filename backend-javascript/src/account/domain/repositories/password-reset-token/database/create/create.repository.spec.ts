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

  afterAll(async () => { await db.disconnect() });

  beforeEach(async () => { 
    await db.query('DELETE FROM password_reset_token')
    await db.query('DELETE FROM "user"')
  });

  it('Deve persistir no banco e retornar o id real', async () => {
    const userId = await db.insert(
      `INSERT INTO "user" (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id`,
      {name: 'nome', email: 'fake.email@gmail.com ', password_hash: 'password-hash-fake'}
    );

    const passwordResetToken = new PasswordResetToken(
      new PasswordResetTokenDto({
          userId: userId,
          hashToken: "HASHED_123",
          expiresAt: "2035-01-01T00:00:00Z",
          used: false
      })
    );
    const passwordResetTokenId = await repository.handle(passwordResetToken);
    
    const rows = await db.query('SELECT * FROM password_reset_token WHERE id = $1', [passwordResetTokenId]);
    expect(rows).toHaveLength(1);
    expect(rows[0].user_id).toBe(userId);
    expect(rows[0].token_hash).toBe("HASHED_123");
    expect(new Date(rows[0].expires_at).toISOString()).toBe(
      "2035-01-01T00:00:00.000Z"
    );
  });
});
