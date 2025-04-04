import { remove } from './index';
import { api, axios } from '../api';
import { utils } from '../../utils';
import { AxiosError } from 'axios';

// Mock the api module
jest.mock('../api', () => ({
  api: {
    delete: jest.fn(),
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

describe('remove', () => {
  const mockEndpoint = '/test-endpoint';
  const mockId = '123';
  const mockResponse = { data: 'success' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully remove a resource', async () => {
    (api.delete as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await remove(mockEndpoint, mockId);

    expect(api.delete).toHaveBeenCalledWith(`${mockEndpoint}/${mockId}`);
    expect(result).toEqual(mockResponse);
  });

  it('should handle Axios error with response data', async () => {
    const mockError = {
      response: {
        data: { message: 'Error message' },
      },
    } as AxiosError;
    const mockHtmlList = '<ul><li>Error message</li></ul>';

    (api.delete as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(true);
    (utils.jsonToHtmlList as jest.Mock).mockReturnValueOnce(mockHtmlList);

    await expect(remove(mockEndpoint, mockId)).rejects.toThrow(mockHtmlList);
    expect(api.delete).toHaveBeenCalledWith(`${mockEndpoint}/${mockId}`);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify(mockError.response?.data));
  });

  it('should handle Axios error without response data', async () => {
    const mockError = {} as AxiosError;
    const mockHtmlList = '<ul><li>Error message</li></ul>';

    (api.delete as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(true);
    (utils.jsonToHtmlList as jest.Mock).mockReturnValueOnce(mockHtmlList);

    await expect(remove(mockEndpoint, mockId)).rejects.toThrow(mockHtmlList);
    expect(api.delete).toHaveBeenCalledWith(`${mockEndpoint}/${mockId}`);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify(undefined));
  });

  it('should handle non-Axios error', async () => {
    const mockError = new Error('Network error');

    (api.delete as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(false);

    await expect(remove(mockEndpoint, mockId)).rejects.toThrow('Erro ao tentar obter dados da api.');
    expect(api.delete).toHaveBeenCalledWith(`${mockEndpoint}/${mockId}`);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).not.toHaveBeenCalled();
  });

  it('should handle empty endpoint', async () => {
    const emptyEndpoint = '';
    (api.delete as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await remove(emptyEndpoint, mockId);

    expect(api.delete).toHaveBeenCalledWith(`${emptyEndpoint}/${mockId}`);
    expect(result).toEqual(mockResponse);
  });

  it('should handle empty id', async () => {
    const emptyId = '';
    (api.delete as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await remove(mockEndpoint, emptyId);

    expect(api.delete).toHaveBeenCalledWith(`${mockEndpoint}/${emptyId}`);
    expect(result).toEqual(mockResponse);
  });

  it('should handle endpoint with trailing slash', async () => {
    const endpointWithSlash = '/test-endpoint/';
    (api.delete as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await remove(endpointWithSlash, mockId);

    expect(api.delete).toHaveBeenCalledWith(`${endpointWithSlash}${mockId}`);
    expect(result).toEqual(mockResponse);
  });
}); 