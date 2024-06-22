import axios from 'axios'
import { LaravelPaginationType } from './types';

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/' //baseURL: import.meta.env.VITE_APP_BASE_URL
})

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

async function search(endpoint: string, searchParams?: []): Promise<LaravelPaginationType> { 
  try {
    const response = await api.post(endpoint, searchParams)
    return response.data 
  } catch (error) {
    console.log(error)
    return {} as LaravelPaginationType
  }
}


async function create(endpoint: string, data: object): Promise<[]>{
  try {
    const response = await api.post(endpoint, data)
      return response.data 
  } catch (error) {
    console.log(error);
    return []
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

export const baseApi = {
  list,
  get,
  paginate,
  update,
  create,
  search,
  remove
}
