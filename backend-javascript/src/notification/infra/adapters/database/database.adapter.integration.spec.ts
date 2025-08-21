import { DatabaseAdapter } from '@src/notification/infra/adapters/database/database.adapter';
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
    const result = await 
    adapter.insert(
       `INSERT INTO "user" (name, email) VALUES ($1, $2) RETURNING id`,
      { 
        name: 'Integration Test', 
        email: testEmail 
      }
    );

    expect(result).toHaveProperty('id');
    expect(typeof result.id).toBe('number');

    const res = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [result.id]);
    expect(res.rowCount).toBe(1);
    expect(res.rows[0].email).toBe(testEmail);
  });


  it('should delete a user and return affectedRows = 1', async () => {
    const testEmail = `test-integration-delete-${Date.now()}@example.com`;
    const insertResult = await adapter.insert(
      `INSERT INTO "user" (name, email) VALUES ($1, $2) RETURNING id`,
      { name: 'Delete Test', email: testEmail }
    );

    const userId = insertResult.id;
    const deleteResult = await adapter.delete(
      `DELETE FROM "user" WHERE id = $1`,
      [userId]
    );

    expect(deleteResult).toHaveProperty('affectedRows', 1);
    const res = await pool.query(`SELECT * FROM "user" WHERE id = $1`, [userId]);
    expect(res.rowCount).toBe(0);
  });

  it('should select users by email using adapter.select', async () => {
    const testEmail = `test-integration-select-${Date.now()}@example.com`;
    await adapter.insert(
      `INSERT INTO "user" (name, email) VALUES ($1, $2) RETURNING id`,
      { name: 'Select Test', email: testEmail }
    );

    const result = await adapter.select<{ id: number; name: string; email: string }>(
      `SELECT id, name, email FROM "user" WHERE email = $1`,
      [testEmail]
    );

    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('id');
    expect(result[0].email).toBe(testEmail);
    expect(result[0].name).toBe('Select Test');
  });

});
