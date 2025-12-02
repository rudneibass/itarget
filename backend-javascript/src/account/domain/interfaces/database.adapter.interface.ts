export interface DatabaseAdapterInterface {
  //insert<T extends Record<string, any>>(query: string, data: T): Promise<{ id: string }>
  insert(query: string, data: Record<string, unknown>): Promise<{ id: string }>
  select(query: string, data: Record<string, unknown>): Promise<Record<string, any>>
  delete(query: string, params: string[]): Promise<{ affectedRows: number }>
  query(sql: string, params?: any[]): Promise<any[]>;
  close(): Promise<void>;
  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}