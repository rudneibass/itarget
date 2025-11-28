// search.test.ts
import { search } from './';
import { api, axios } from '../api';
import { utils } from '../../utils/index';

jest.mock('../api');
jest.mock('../../utils/index');

describe('search', () => {
  const mockedApi = api as jest.Mocked<typeof api>;
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedUtils = utils as jest.Mocked<typeof utils>;

  const endpoint = '/test';
  const searchParams = { query: 'test' };
  const mockResponseData = { data: 'test data' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Search should return data from the API on success', async () => {
    mockedApi.get.mockResolvedValue({ data: mockResponseData });

    const result = await search(endpoint, searchParams);

    expect(mockedApi.get).toHaveBeenCalledWith(endpoint, { params: searchParams });
    expect(result).toEqual({ data: mockResponseData });
  });

  it('Search should throw an error with formatted message when axios error occurs', async () => {
    const error = {
      isAxiosError: true,
      response: { data: { error: 'test error' } },
    };

    mockedApi.get.mockRejectedValue(error);
    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedUtils.jsonToHtmlList.mockReturnValue('<ul><li>error: test error</li></ul>');

    await expect(search(endpoint, searchParams)).rejects.toThrow('<ul><li>error: test error</li></ul>');

    expect(mockedApi.get).toHaveBeenCalledWith(endpoint, { params: searchParams });
    expect(mockedAxios.isAxiosError).toHaveBeenCalledWith(error);
    expect(mockedUtils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify({ error: 'test error' }));
  });

  it('Search should throw a generic error when a non-axios error occurs', async () => {
    const error = new Error('generic error');
    mockedApi.get.mockRejectedValue(error);
    mockedAxios.isAxiosError.mockReturnValue(false);

    await expect(search(endpoint, searchParams)).rejects.toThrow('Erro ao tentar obter dados da api.');

    expect(mockedApi.get).toHaveBeenCalledWith(endpoint, { params: searchParams });
    expect(mockedAxios.isAxiosError).toHaveBeenCalledWith(error);
  });
});