import { utils } from '../../utils/index'
import { api, axios } from '../api'

export async function getFormWithValues({ endpoint, formName, id } : { endpoint: string, formName: string, id: string }): Promise<unknown> {
  try {
    const response = await api.get(endpoint, { params: { form_name: formName, id: id }})
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(utils.jsonToHtmlList(JSON.stringify(error.response?.data)))
    }
    throw new Error('Erro ao tentar obter dados da api.')
  }
}
