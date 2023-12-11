import { RegistrationInterface,RegistrationStoreUpdateInterface } from './types'
import { api } from '../api'
 
import { toastContainer, errorAlert, successAlert } from '../../components/ToastifyAlerts'

async function store(data :RegistrationStoreUpdateInterface): Promise<RegistrationInterface[]>{
  try {
    const response = await api.post('registrations', data)
    if(response.status === 201){
      return response.data 
    }

  } catch (error) {
      console.log('An error occurred:', error);
  }
  return []
}

async function list(): Promise<RegistrationInterface[]> { 
  try {
    const response = await api.get('registrations')
    
    return response.data 

  } catch (error) {
    console.log(error)
  }
  return []
}

async function search(searchParam: string): Promise<RegistrationInterface[]> { 
  try {
    const response = await api.get(`registrations/${searchParam}`)
    return response.data 

  } catch (error) {
    console.log(error)
  }
  return []
}

async function show(param: string): Promise<RegistrationInterface[]> { 
  try {
    const response = await api.get(`registrations/${param}`)
    return response.data 
  } catch (error) {
    console.log(error)
  }
  return []
}



async function update(pk_data: string, data :RegistrationStoreUpdateInterface): Promise<RegistrationInterface[]>{
  try {
    const response = await api.put(`registrations/${pk_data}`, data)
    return response.data 
  } catch (error) {
    console.log(error)
  }
  return []
}

async function destroy(pk_data: string): Promise<RegistrationInterface[]>{
  try {
    const response = await api.delete(`registrations/${pk_data}`)
    return response.data 
  } catch (error) {
    console.log(error)
  }
  return []
}

export const apiRegistrations = {
  list,
  show,
  update,
  store,
  search,
  destroy
}
