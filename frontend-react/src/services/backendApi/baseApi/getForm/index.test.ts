import { getForm } from './index';
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

describe('getForm', () => {
  const mockEndpoint = '/test-endpoint';
  const mockFormName = 'test-form';
  const mockResponse = { data: 'success' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully get form with formName', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getForm({ endpoint: mockEndpoint, formName: mockFormName });

    expect(api.get).toHaveBeenCalledWith(mockEndpoint, { params: { form_name: mockFormName } });
    expect(result).toEqual(mockResponse.data);
  });

  it('should successfully get form without formName', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getForm({ endpoint: mockEndpoint });

    expect(api.get).toHaveBeenCalledWith(mockEndpoint, { params: { form_name: '' } });
    expect(result).toEqual(mockResponse.data);
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

    await expect(getForm({ endpoint: mockEndpoint, formName: mockFormName }))
      .rejects.toThrow(mockHtmlList);
    expect(api.get).toHaveBeenCalledWith(mockEndpoint, { params: { form_name: mockFormName } });
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify(mockError.response?.data));
  });

  it('should handle Axios error without response data', async () => {
    const mockError = {} as AxiosError;
    const mockHtmlList = '<ul><li>Error message</li></ul>';

    (api.get as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(true);
    (utils.jsonToHtmlList as jest.Mock).mockReturnValueOnce(mockHtmlList);

    await expect(getForm({ endpoint: mockEndpoint, formName: mockFormName }))
      .rejects.toThrow(mockHtmlList);
    expect(api.get).toHaveBeenCalledWith(mockEndpoint, { params: { form_name: mockFormName } });
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).toHaveBeenCalledWith(JSON.stringify(undefined));
  });

  it('should handle non-Axios error', async () => {
    const mockError = new Error('Network error');

    (api.get as jest.Mock).mockRejectedValueOnce(mockError);
    (axios.isAxiosError as jest.Mock).mockReturnValueOnce(false);

    await expect(getForm({ endpoint: mockEndpoint, formName: mockFormName }))
      .rejects.toThrow('Erro ao tentar obter dados da api.');
    expect(api.get).toHaveBeenCalledWith(mockEndpoint, { params: { form_name: mockFormName } });
    expect(axios.isAxiosError).toHaveBeenCalledWith(mockError);
    expect(utils.jsonToHtmlList).not.toHaveBeenCalled();
  });

  it('should handle empty endpoint', async () => {
    const emptyEndpoint = '';
    (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getForm({ endpoint: emptyEndpoint, formName: mockFormName });

    expect(api.get).toHaveBeenCalledWith(emptyEndpoint, { params: { form_name: mockFormName } });
    expect(result).toEqual(mockResponse.data);
  });

  it('should handle empty formName', async () => {
    const emptyFormName = '';
    (api.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getForm({ endpoint: mockEndpoint, formName: emptyFormName });

    expect(api.get).toHaveBeenCalledWith(mockEndpoint, { params: { form_name: emptyFormName } });
    expect(result).toEqual(mockResponse.data);
  });
}); 