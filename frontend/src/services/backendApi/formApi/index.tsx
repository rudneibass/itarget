import { baseApi } from '../baseApi/index'

function isObject(data: unknown): data is Record<string, unknown> {
  return data !== null && typeof data === 'object' && !Array.isArray(data);
}

async function getByName(endpoint: string, params?: object){
  const response = await baseApi.executeRequest(async () =>{
    return await baseApi.api.get(endpoint, {
      params: params
    })
  })
  if(response && isObject(response) && response.data){
    return response.data
  }
  return {}
}

const path = 'form/'
const actions = Object.fromEntries(Object.entries(baseApi.defaultActions).map(([key, value]) => [key, path + value]))
const endpoints = {
    ...actions,
    getByName: `${path}name/`
}

export const formApi = {
  ...baseApi,
   endpoints,
   getByName
}