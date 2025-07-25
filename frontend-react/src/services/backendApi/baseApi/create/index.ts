import { utils } from '../../utils/index'
import { api, axios } from '../api'

export async function create(endpoint: string, params: object): Promise<unknown> {
  try {
    return await api.post(endpoint, params)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(utils.jsonToHtmlList(JSON.stringify(error.response?.data)))
    }
    throw new Error('Erro ao tentar obter dados da api.')
  }
}
