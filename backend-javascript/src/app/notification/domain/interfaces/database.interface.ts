export interface IDatabaseAdapter {
  insert(query: string, data: Record<string, any>): Promise<{ id: string }>
  delete(query: string, params: string[]): Promise<{ affectedRows: number }>
  select<T = any>(query: string, params?: any[]): Promise<T[]>
}