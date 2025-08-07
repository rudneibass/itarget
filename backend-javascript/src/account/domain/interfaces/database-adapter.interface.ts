export interface IDatabaseAdapter {
  insert(query: string, data: { name: string; email: string }): Promise<{ id: string }>
  delete(query: string, params: string[]): Promise<{ affectedRows: number }>
}