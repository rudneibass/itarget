import { baseApi } from '../baseApi/index'
import { FormType, convertToFormType, isObject } from './type'

async function getByName(endpoint: string): Promise<FormType> {
  const response = await baseApi.executeRequest(async () =>{
    return await baseApi.api.get(endpoint)
  })

  if(response && isObject(response) && response.data){
    if(Array.isArray(response.data)){
      return convertToFormType(response.data[0]);
    }
    if(!Array.isArray(response.data)){
      return convertToFormType(response.data);
    }
  }

  return {} as FormType
}

export const formApi = {
  ...baseApi,
  getByName
}