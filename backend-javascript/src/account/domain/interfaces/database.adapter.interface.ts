export interface DatabaseAdapterInterface {
  insert(query: string, data: Record<string, unknown>): Promise<{ id: string }>
  select(query: string, data: Record<string, unknown>): Promise<Record<string, any>>
  delete(query: string, params: string[]): Promise<{ affectedRows: number }>
  //insert<T extends Record<string, any>>(query: string, data: T): Promise<{ id: string }>
}