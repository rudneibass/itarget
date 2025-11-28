import { utils } from '../../utils/index'
import { api, axios } from '../api'

export async function update({ endpoint, id, data } : { endpoint: string, id: string, data: object}): Promise<unknown> {
  try {
    return await api.put(`${endpoint}/${id}`, data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(utils.jsonToHtmlList(JSON.stringify(error.response?.data)))
    }
    throw new Error('Erro ao tentar obter dados da api.')
  }
}