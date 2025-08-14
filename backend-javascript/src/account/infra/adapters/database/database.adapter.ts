import { Injectable } from '@nestjs/common';
import type { IDatabaseAdapter } from '@src/account/domain/interfaces/database-adapter.interface';
import { Pool } from 'pg';

@Injectable()
export class DatabaseAdapter implements IDatabaseAdapter {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'postgres-backend-javascript',
      database: 'backend_javascript',
      password: 'postgres',
      port: 5432,
    });
  }

  async insert(query: string,  data: { name: string; email: string }): Promise<{ id: string }> {
    try {
      const result = await this.pool.query(query, [data.name, data.email]);
      const id = result.rows[0]?.id;

      if (!id) {
        throw new Error('Failed to retrieve inserted user ID');
      }

      return { id };
    } catch (error) {
      console.error('Database insertion error:', error);
      throw new Error(`${error}`);
    }
  }

  async delete(query: string, params: string[]): Promise<{ affectedRows: number }> {
    try {
      const result = await this.pool.query(query, params);
      return { affectedRows: result.rowCount };
    } catch (error) {
      console.error('Database deletion error:', error);
      throw new Error(`${error}`);
    }
  }

  async findById(query: string, params: string[]): Promise<{ id: string; name: string; email: string } | null> {
    try {
      const result = await this.pool.query(query, params);
      const user = result.rows[0];

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      console.error('Database findById error:', error);
      throw new Error(`${error}`);
    }
  }
}
