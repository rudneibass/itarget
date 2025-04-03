import { utils } from '../../utils/index'
import { api, axios } from '../api'

export async function remove(endpoint: string, id: string): Promise<unknown> {
  try {
    return await api.delete(`${endpoint}/${id}`)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(utils.jsonToHtmlList(JSON.stringify(error.response?.data)))
    }
    throw new Error('Erro ao tentar obter dados da api.')
  }
}

