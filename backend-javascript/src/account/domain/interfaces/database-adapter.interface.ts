export interface IDatabaseAdapter {
  insert(data: { name: string; email: string }): Promise<{ id: string }>;
}