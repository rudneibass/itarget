import { DatabaseAdapter } from './database.adapter';
import { Pool } from 'pg';

describe('PostgresDatabaseAdapter Integration Test', () => {
  let adapter: DatabaseAdapter;
  let pool: Pool;

  beforeAll(() => {
    pool = new Pool({
      user: 'postgres',
      host: 'postgres-backend-javascript',
      database: 'backend_javascript',
      password: 'postgres',
      port: 5432,
    });

    adapter = new DatabaseAdapter();
  });

  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await pool.query(`DELETE FROM "user" WHERE email LIKE 'test-integration-%'`);
  });

  it('should insert a user and return its id', async () => {
    const testEmail = `test-integration-${Date.now()}@example.com`;
    const result = await adapter.insert({ name: 'Integration Test', email: testEmail });

    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe('number');

    const res = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [result.id]);
    expect(res.rowCount).toBe(1);
    expect(res.rows[0].email).toBe(testEmail);
  });
});
