export interface DatabaseAdapterInterface {
  //insert<T extends Record<string, any>>(query: string, data: T): Promise<{ id: string }>
  insert(query: string, data: Record<string, unknown>): Promise<{ id: string }>
  delete(query: string, params: string[]): Promise<{ affectedRows: number }>
}