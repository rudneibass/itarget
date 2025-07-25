import { utils } from '../../utils/index'
import { api, axios } from '../api'

export async function getFormCreate({ endpoint, formName } : { endpoint: string, formName?:string }): Promise<unknown> {
  try {
    const form_name = formName || ''
    const response = await api.get(endpoint, { params: { form_name } })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(utils.jsonToHtmlList(JSON.stringify(error.response?.data)))
    }
    throw new Error('Erro ao tentar obter dados da api.')
  }
}

