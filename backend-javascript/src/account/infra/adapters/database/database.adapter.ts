import { Injectable } from '@nestjs/common';
import type { DatabaseAdapterInterface } from '@src/account/domain/interfaces/database.adapter.interface';
import { Pool } from 'pg';

@Injectable()
export class DatabaseAdapter implements DatabaseAdapterInterface {
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

  async insert(query: string, data: Record<string, any>): Promise<{ id: string }> {
    try {
      const values = Object.values(data);
      const result = await this.pool.query(query, values);
      const id = result.rows[0]?.id;

      if (!id) {
        throw new Error('Falha ao recuperar o ID do registro inserido');
      }

      return { id };
    } catch (error) {
      console.error('Erro ao inserir no banco:', error);
      throw new Error(`${error}`);
    }
  }

  /*async insert(query: string, data: Record<string, unknown>): Promise<{ id: string }> {
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
  }*/

  async delete(query: string, params: string[]): Promise<{ affectedRows: number }> {
    try {
      const result = await this.pool.query(query, params);
      return { affectedRows: result.rowCount };
    } catch (error) {
      console.error('Database deletion error:', error);
      throw new Error(`${error}`);
    }
  }

}
