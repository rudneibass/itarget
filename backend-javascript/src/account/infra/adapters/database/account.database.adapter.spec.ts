import { DatabaseAdapter } from '@src/account/infra/adapters/database/database.adapter';
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

  afterEach(async () => { await pool.query(`DELETE FROM "user" WHERE email LIKE 'test-integration-%'`) });

  it('Should insert a user and return its id', async () => {
    const testEmail = `test-integration-${Date.now()}@example.com`;
    const testPasswordHash = `test-password-hash-${Date.now()}`;
    const id = await 
    adapter.insert(
       `INSERT INTO "user" (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id`,
      { name: 'Integration Test',  email: testEmail, passwordHash: testPasswordHash }
    );
    expect(typeof id).toBe('number');
    const res = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [id]);
    expect(res.rowCount).toBe(1);
    expect(res.rows[0].email).toBe(testEmail);
  });


  it('Should delete a user and return affectedRows = 1', async () => {
    const testEmail = `test-integration-delete-${Date.now()}@example.com`;
    const testPasswordHash = `test-password-hash-${Date.now()}`;

    const id = await adapter.insert(
      `INSERT INTO "user" (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id`,
      { name: 'Delete Test', email: testEmail, passwordHash: testPasswordHash }
    );

    const deleteResult = await adapter.delete(
      `DELETE FROM "user" WHERE id = $1`,
      [id.toString()]
    );

    expect(deleteResult).toHaveProperty('affectedRows', 1);
    const res = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [id]);
    expect(res.rowCount).toBe(0);
  });

});
