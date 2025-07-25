import { get } from './index';
import { api, axios } from '../api';
import { utils } from '../../utils';
import { AxiosError } from 'axios';

// Mock the api module
jest.mock('../api', () => ({
  api: {
    get: jest.fn(),
  },
  axios: {
    isAxiosError: jest.fn(),
  },
}));

// Mock the utils module
jest.mock('../../utils', () => ({
  utils: {
    jsonToHtmlList: jest.fn(),
  },
}));

describe('get', () => {
  const mockEndpoint = '/test-endpoint/';
  const mockId = '123';
  const mockResponse = { data: 'success' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully get a resource', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await get(mockEndpoint, mockId);

    expect(api.get).toHaveBeenCalledWith(`${mockEndpoint}${mockId}`);
    expect(result).toEqual(mockResponse);
  });

  it('should handle Axios error with response data', async () => {
    const mockError = {
      response: {
        data: { message: 'Error message' },
      },
    } as AxiosError;
    const mockHtmlList = '<ul><li>Error message</li></ul>';

    (api.get as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(true);
    (utils.jsonToHtmlList as jest.Mock).mockReturnValueOnce(mockHtmlList);

    await expect(get(mockEndpoint, mockId)).rejects.toThrow(mockHtmlList);
    expect(api.get).toHaveBeenCalledWith(`${mockEndpoint}${mockId}`);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify(mockError.response?.data));
  });

  it('should handle Axios error without response data', async () => {
    const mockError = {} as AxiosError;
    const mockHtmlList = '<ul><li>Error message</li></ul>';

    (api.get as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(true);
    (utils.jsonToHtmlList as jest.Mock).mockReturnValueOnce(mockHtmlList);

    await expect(get(mockEndpoint, mockId)).rejects.toThrow(mockHtmlList);
    expect(api.get).toHaveBeenCalledWith(`${mockEndpoint}${mockId}`);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify(undefined));
  });

  it('should handle non-Axios error', async () => {
    const mockError = new Error('Network error');

    (api.get as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(false);

    await expect(get(mockEndpoint, mockId)).rejects.toThrow('Erro ao tentar obter dados da api.');
    expect(api.get).toHaveBeenCalledWith(`${mockEndpoint}${mockId}`);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).not.toHaveBeenCalled();
  });

  it('should handle empty endpoint', async () => {
    const emptyEndpoint = '';
    
    (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await get(emptyEndpoint, mockId);

    expect(api.get).toHaveBeenCalledWith(`${emptyEndpoint}${mockId}`);
    expect(result).toEqual(mockResponse);
  });

  it('should handle empty id', async () => {
    const emptyId = '';
    
    (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await get(mockEndpoint, emptyId);

    expect(api.get).toHaveBeenCalledWith(`${mockEndpoint}${emptyId}`);
    expect(result).toEqual(mockResponse);
  });
}); 