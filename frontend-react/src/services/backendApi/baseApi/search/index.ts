import { utils } from '../../utils/index'
import { api, axios } from '../api'

export async function search(endpoint: string, searchParams?: object): Promise<unknown> {
  try {
    return await api.get(endpoint, {
      params: searchParams
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(utils.jsonToHtmlList(JSON.stringify(error.response?.data)))
    }
    throw new Error('Erro ao tentar obter dados da api.')
  }
}
