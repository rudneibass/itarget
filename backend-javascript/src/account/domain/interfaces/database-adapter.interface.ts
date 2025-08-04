export interface IDatabaseAdapter {
  insert(query: string, data: { name: string; email: string }): Promise<{ id: string }>;
}