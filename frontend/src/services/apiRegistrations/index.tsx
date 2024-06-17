import { RegistrationInterface,RegistrationStoreUpdateInterface } from './types'
import { api } from '../api'
import  { ENDPOINTS }  from '../../enums/endpoints'

async function store(data :RegistrationStoreUpdateInterface): Promise<RegistrationInterface[]>{
  try {
    const response = await api.post(`${ENDPOINTS.registration.endpoint}${ENDPOINTS.registration.default_actions.create}`, data)
      return response.data 
  } catch (error) {
    console.log('An error occurred:', error);
    return []
  }
}

async function list(): Promise<RegistrationInterface[]> { 
  try {
    const response = await api.get(`${ENDPOINTS.registration.endpoint}${ENDPOINTS.registration.default_actions.paginate}/10`)
    return response.data.response_data[0]
  } catch (error) {
    console.log(error)
    return []
  }
}

async function search(searchParam: string): Promise<RegistrationInterface[]> { 
  try {
    const response = await api.post(`${ENDPOINTS.registration.endpoint}${ENDPOINTS.registration.default_actions.search}`, searchParam)
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}

async function show(param: string): Promise<RegistrationInterface[]> { 
  try {
    const response = await api.get(`${ENDPOINTS.registration.endpoint}${ENDPOINTS.registration.default_actions.get}${param}`)
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}

async function update(pk_data: string, data :RegistrationStoreUpdateInterface): Promise<RegistrationInterface[]>{
  try {
    const response = await api.put(`${ENDPOINTS.registration.endpoint}${ENDPOINTS.registration.default_actions.update}${pk_data}`, data)
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}

async function destroy(pk_data: string): Promise<RegistrationInterface[]>{
  try {
    const response = await api.delete(`${ENDPOINTS.registration.endpoint}${ENDPOINTS.registration.default_actions.delete}${pk_data}`)
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}

export const apiRegistrations = {
  list,
  show,
  update,
  store,
  search,
  destroy
}
