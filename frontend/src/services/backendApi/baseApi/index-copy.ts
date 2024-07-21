import axios, { AxiosError } from 'axios'
import { LaravelPaginationType } from './types';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/' //baseURL: import.meta.env.VITE_APP_BASE_URL
})

function resolvePath(urlPath: string){
  return urlPath.split('/')[1]
}

async function list(endpoint: string): Promise<[]>{ 
  try {
    const response = await api.get(endpoint)
    return response.data.response_data
  } catch (error) {
    console.log(error)
    return []
  }
}

async function paginate(endpoint: string, itemsPerPage = 10): Promise<LaravelPaginationType>{ 
    try {
      const response = await api.get(`${endpoint}${itemsPerPage}`)
      return response.data.response_data[0]
    } catch (error) {
      console.log(error)
      return {} as LaravelPaginationType
    }
}

async function search(endpoint: string, searchParams?: object): Promise<LaravelPaginationType> { 
  try {
    const response = await api.post(endpoint, searchParams)
    return response.data.response_data
  } catch (error) {
    console.log(error)
    return {} as LaravelPaginationType
  }
}

async function get(endpoint: string, pk_data: string): Promise<[]>{ 
  try {
    const response = await api.get(`${endpoint}${pk_data}`)
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}

async function update(endpoint: string, pk_data: string, data: object): Promise<[]>{
  try {
    const response = await api.put(`${endpoint}${pk_data}`, data)
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}

async function remove(endpoint: string, pk_data: string): Promise<[]>{
  try {
    const response = await api.delete(`${endpoint}${pk_data}`)
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}


async function executeRequest(requestFunction: () => Promise<unknown>): Promise<unknown> {
  try {
  
    return await requestFunction();
  
  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)  
    }

    throw new Error('Erro ao tentar obeter dados da api.')

    /*
    const response_error = {
      code: 'UNKNOWN_ERROR',
      status: 0,
      message: 'Unknown Error',
      error_422_backend_api: ''
    }
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ response_data: Record<string, string[]> }>;
      const api_response_error_data = axiosError.response?.data.response_data
    
      response_error.code = axiosError.code || 'UNKNOWN_ERROR'
      response_error.status = axiosError.response?.status || 0
      response_error.message = axiosError.message || 'Unknown Error'

      switch(response_error.status){
        case 422:
          if(api_response_error_data){
            response_error.error_422_backend_api = 'Api response error: \n'
            for (const key in api_response_error_data) {
              api_response_error_data[key].forEach((value) => {
                response_error.error_422_backend_api += value + '\n'
              });
            }
          }
      }
    }
    return response_error
    */
  }
}

async function create(endpoint: string, params: object){
  return await executeRequest(async () =>{
    return await api.post(endpoint, params)
  })
}

export const baseApi = {
  api,
  executeRequest,
  resolvePath,
  list,
  get,
  paginate,
  update,
  create,
  search,
  remove
}
