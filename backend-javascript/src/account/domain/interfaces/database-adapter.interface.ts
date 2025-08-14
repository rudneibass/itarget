export interface IDatabaseAdapter {
  insert(query: string, data: { name: string; email: string }): Promise<{ id: string }>
  delete(query: string, params: string[]): Promise<{ affectedRows: number }>
  findById(query: string, params: string[]): Promise<{ id: string; name: string; email: string } | null>
  find(query: string, params: string[]): Promise<Array<Record<string,string>> | null>
}