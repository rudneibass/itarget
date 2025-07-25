import { create } from './index';
import { api, axios } from '../api';
import { utils } from '../../utils';

// Mock the api module
jest.mock('../api', () => ({
  api: {
    post: jest.fn(),
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

describe('create', () => {
  const mockEndpoint = '/test-endpoint';
  const mockParams = { key: 'value' };
  const mockResponse = { data: 'success' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully create a resource', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await create(mockEndpoint, mockParams);

    expect(api.post).toHaveBeenCalledWith(mockEndpoint, mockParams);
    expect(result).toEqual(mockResponse);
  });

  it('should handle Axios error with response data', async () => {
    const mockError = {
      response: {
        data: { message: 'Error message' },
      },
    };
    const mockHtmlList = '<ul><li>Error message</li></ul>';

    (api.post as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(true);
    (utils.jsonToHtmlList as jest.Mock).mockReturnValueOnce(mockHtmlList);

    await expect(create(mockEndpoint, mockParams)).rejects.toThrow(mockHtmlList);
    expect(api.post).toHaveBeenCalledWith(mockEndpoint, mockParams);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify(mockError.response?.data));
  });

  it('should handle Axios error without response data', async () => {
    const mockError = {};
    const mockHtmlList = '<ul><li>Error message</li></ul>';

    (api.post as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(true);
    (utils.jsonToHtmlList as jest.Mock).mockReturnValueOnce(mockHtmlList);

    await expect(create(mockEndpoint, mockParams)).rejects.toThrow(mockHtmlList);
    expect(api.post).toHaveBeenCalledWith(mockEndpoint, mockParams);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify(undefined));
  });

  it('should handle non-Axios error', async () => {
    const mockError = new Error('Network error');

    (api.post as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(false);

    await expect(create(mockEndpoint, mockParams)).rejects.toThrow('Erro ao tentar obter dados da api.');
    expect(api.post).toHaveBeenCalledWith(mockEndpoint, mockParams);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).not.toHaveBeenCalled();
  });
}); 