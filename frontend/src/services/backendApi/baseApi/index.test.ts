import { baseApi } from '.';

describe('baseApi', () => {
  test('resolvePath should extract the first segment of the URL', () => {
    expect(baseApi.resolvePath('/user/profile')).toBe('user');
    expect(baseApi.resolvePath('/api/data')).toBe('api');
  });
});
