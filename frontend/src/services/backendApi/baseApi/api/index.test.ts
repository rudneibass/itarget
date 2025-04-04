
import { api } from '.';

describe('search (real API)', () => {
  it('should return data from the real API', async () => {
    const endpoint = 'http://localhost:81/api/form/search';
    const searchParams = { query: 'test' };
    try {
      const response = await api.get(endpoint, { params: searchParams });
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
    } catch (error) {
      console.error('Erro na solicitação da API:', error);
      throw error;
    }
  }, 10000);
});