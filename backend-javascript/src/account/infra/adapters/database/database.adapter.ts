import { Injectable } from '@nestjs/common';
import type { DatabaseAdapterInterface } from '@src/account/domain/interfaces/database.adapter.interface';
import { Pool, PoolClient, QueryResult  } from 'pg';

@Injectable()
export class DatabaseAdapter implements DatabaseAdapterInterface {
  private readonly pool: Pool;
  private client?: PoolClient;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'postgres-backend-javascript',
      database: 'backend_javascript',
      password: 'postgres',
      port: 5432,
    });
  }

  async insert(query: string, data: Record<string, any>): Promise<number> {
    try {
      const values = Object.values(data);
      const result = await this.pool.query(query, values);

      const idString = result.rows[0]?.id;

      if (!idString) {
        throw new Error('Falha ao recuperar o ID do registro inserido');
      }

      const id = Number(idString);
      if (Number.isNaN(id)) {
        throw new Error(`ID retornado pelo banco não é numérico: ${idString}`);
      }

      return id 

    } catch (error) {
      console.error('Erro ao inserir no banco:', error);
      throw new Error(`${error}`);
    }
  }

  async select(query: string, data: Record<string, any>): Promise<Record<string, unknown>> {
    try {
      const values = Object.values(data);
      const result = await this.pool.query(query, values);

      return result;
    } catch (error) {
      console.error('Erro select no banco:', error);
      throw new Error(`${error}`);
    }
  }

  async update(query: string, data: Record<string, any>): Promise<number> {
    try {
      const values = Object.values(data);
      const result = await this.pool.query(query, values);
      const idString = result.rows[0]?.id;
      
      if (!idString) {
        throw new Error('Falha ao recuperar o ID do registro inserido');
      }

      const id = Number(idString);
      if (Number.isNaN(id)) {
        throw new Error(`ID retornado pelo banco não é numérico: ${idString}`);
      }

      return id 

    } catch (error) {
      console.error('Erro ao fazer update no banco:', error);
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

  async query(sql: string, params?: any[]): Promise<any[]> {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows;
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error(`${error}`);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.pool.end();
    } catch (error) {
      console.error('Error closing pool:', error);
      throw new Error(`${error}`);
    }
  }

  async beginTransaction(): Promise<void> {
    try {
      if (!this.client) {
        this.client = await this.pool.connect();
      }
      await this.client.query('BEGIN');
    } catch (error) {
      console.error('Error beginning transaction:', error);
      throw new Error(`${error}`);
    }
  }

  async commit(): Promise<void> {
    try {
      if (!this.client) {
        throw new Error('No active transaction');
      }
      await this.client.query('COMMIT');
      this.client.release();
      this.client = undefined;
    } catch (error) {
      console.error('Error committing transaction:', error);
      throw new Error(`${error}`);
    }
  }

  async rollback(): Promise<void> {
    try {
      if (!this.client) {
        throw new Error('No active transaction');
      }
      await this.client.query('ROLLBACK');
      this.client.release();
      this.client = undefined;
    } catch (error) {
      console.error('Error rolling back transaction:', error);
      throw new Error(`${error}`);
    }
  }
}
