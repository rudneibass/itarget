import { EventInterface, EventStoreUpdateInterface } from './types'
import { api } from '../api'
import  { ENDPOINTS }  from '../../enums/endpoints'
 

async function list(): Promise<EventInterface[]> { 
  try {
    const response = await api.get(ENDPOINTS.event.endpoint)
    return response.data.response_data 

  } catch (error) {
    console.log(error)
  }
  return []
}

async function search(searchParam: string): Promise<EventInterface[]> { 
  try {
    const response = await api.post(`${ENDPOINTS.event.endpoint}${ENDPOINTS.event.default_actions.search}`, searchParam)
    return response.data 

  } catch (error) {
    console.log(error)
  }
  return []
}

async function show(param: string): Promise<EventInterface[]> { 
  try {
    const response = await api.get(`${ENDPOINTS.event.default_actions.get}${param}`)
    return response.data 
  } catch (error) {
    console.log(error)
  }
  return []
}

async function store(data : EventStoreUpdateInterface): Promise<EventInterface[]>{
  try {
    const response = await api.post(`${ENDPOINTS.event.endpoint}${ENDPOINTS.event.default_actions.create}`, data)
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}

async function update(pk_data: string, data : EventStoreUpdateInterface): Promise<EventInterface[]>{
  try {
    const response = await api.put(`${ENDPOINTS.event.endpoint}${ENDPOINTS.event.default_actions.update}${pk_data}`, data)
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}

async function destroy(pk_data: string): Promise<EventInterface[]>{
  try {
    const response = await api.delete(`${ENDPOINTS.event.endpoint}${ENDPOINTS.event.default_actions.delete}${pk_data}`)
    return response.data 
  } catch (error) {
    console.log(error)
    return []
  }
}

export const apiEvents = {
  list,
  show,
  update,
  store,
  search,
  destroy
}
