import { DatabaseAdapter } from '@src/account/infra/adapters/database/database.adapter';
import { Pool } from 'pg';

describe('DatabaseAdapter FindById Integration Test', () => {
  let adapter: DatabaseAdapter;
  let pool: Pool;

  beforeAll(async () => {
    pool = new Pool({
      user: 'postgres',
      host: 'postgres-backend-javascript',
      database: 'backend_javascript',
      password: 'postgres',
      port: 5432,
    });
  });

  beforeEach(async () => {
    adapter = new DatabaseAdapter();
    await pool.query(`DELETE FROM "user" WHERE email LIKE 'test-find-%'`);
  });

  afterEach(async () => {
    await pool.query(`DELETE FROM "user" WHERE email LIKE 'test-find-%'`);
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should find a user by id and return user data', async () => {
    const insertResult = await adapter.insert(
      `INSERT INTO "user" (name, email) VALUES ($1, $2) RETURNING id`,
      { name: 'Test Find User', email: 'test-find-1@example.com' }
    );
    const userId = insertResult.id;
    const result = await adapter.findById(
      `SELECT id, name, email FROM "user" WHERE id = $1`,
      [userId]
    );
    expect(result).not.toBeNull();
    expect(result?.id).toBe(userId);
    expect(result?.name).toBe('Test Find User');
    expect(result?.email).toBe('test-find-1@example.com');
  });

  it('should return null when user not found', async () => {
    const result = await adapter.findById(
      `SELECT id, name, email FROM "user" WHERE id = $1`,
      ['non-existent-id']
    );
    expect(result).toBeNull();
  });

  it('should throw error when database connection fails', async () => {
    await expect(
      adapter.findById(
        `SELECT id, name, email FROM "user" WHERE id = $1`,
        ['invalid-id']
      )
    ).rejects.toThrow();
  });

}); 