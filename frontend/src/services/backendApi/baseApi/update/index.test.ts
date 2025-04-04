import { update } from './index';
import { api, axios } from '../api';
import { utils } from '../../utils';
import { AxiosError } from 'axios';

// Mock the api module
jest.mock('../api', () => ({
  api: {
    put: jest.fn(),
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

describe('update', () => {
  const mockEndpoint = '/test-endpoint';
  const mockId = '123';
  const mockData = { name: 'Test Name', value: 'Test Value' };
  const mockResponse = { data: 'success' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update a resource', async () => {
    (api.put as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await update({ endpoint: mockEndpoint, id: mockId, data: mockData });

    expect(api.put).toHaveBeenCalledWith(`${mockEndpoint}/${mockId}`, mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should handle Axios error with response data', async () => {
    const mockError = {
      response: {
        data: { message: 'Error message' },
      },
    } as AxiosError;
    const mockHtmlList = '<ul><li>Error message</li></ul>';

    (api.put as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(true);
    (utils.jsonToHtmlList as jest.Mock).mockReturnValueOnce(mockHtmlList);

    await expect(update({ endpoint: mockEndpoint, id: mockId, data: mockData }))
      .rejects.toThrow(mockHtmlList);
    expect(api.put).toHaveBeenCalledWith(`${mockEndpoint}/${mockId}`, mockData);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify(mockError.response?.data));
  });

  it('should handle Axios error without response data', async () => {
    const mockError = {} as AxiosError;
    const mockHtmlList = '<ul><li>Error message</li></ul>';

    (api.put as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(true);
    (utils.jsonToHtmlList as jest.Mock).mockReturnValueOnce(mockHtmlList);

    await expect(update({ endpoint: mockEndpoint, id: mockId, data: mockData }))
      .rejects.toThrow(mockHtmlList);
    expect(api.put).toHaveBeenCalledWith(`${mockEndpoint}/${mockId}`, mockData);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify(undefined));
  });

  it('should handle non-Axios error', async () => {
    const mockError = new Error('Network error');

    (api.put as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(false);

    await expect(update({ endpoint: mockEndpoint, id: mockId, data: mockData }))
      .rejects.toThrow('Erro ao tentar obter dados da api.');
    expect(api.put).toHaveBeenCalledWith(`${mockEndpoint}/${mockId}`, mockData);
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).not.toHaveBeenCalled();
  });

  it('should handle empty endpoint', async () => {
    const emptyEndpoint = '';
    (api.put as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await update({ endpoint: emptyEndpoint, id: mockId, data: mockData });

    expect(api.put).toHaveBeenCalledWith(`${emptyEndpoint}/${mockId}`, mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should handle empty id', async () => {
    const emptyId = '';
    (api.put as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await update({ endpoint: mockEndpoint, id: emptyId, data: mockData });

    expect(api.put).toHaveBeenCalledWith(`${mockEndpoint}/${emptyId}`, mockData);
    expect(result).toEqual(mockResponse);
  });

  it('should handle empty data', async () => {
    const emptyData = {};
    (api.put as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await update({ endpoint: mockEndpoint, id: mockId, data: emptyData });

    expect(api.put).toHaveBeenCalledWith(`${mockEndpoint}/${mockId}`, emptyData);
    expect(result).toEqual(mockResponse);
  });

  it('should handle endpoint with trailing slash', async () => {
    const endpointWithSlash = '/test-endpoint/';
    (api.put as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await update({ endpoint: endpointWithSlash, id: mockId, data: mockData });

    expect(api.put).toHaveBeenCalledWith(`${endpointWithSlash}${mockId}`, mockData);
    expect(result).toEqual(mockResponse);
  });
}); 