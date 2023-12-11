import { EventInterface, EventStoreUpdateInterface } from './types'
import { api } from '../api'
 

async function list(): Promise<EventInterface[]> { 
  try {
    const response = await api.get('events')
    
    return response.data 

  } catch (error) {
    console.log(error)
  }
  return []
}

async function search(searchParam: string): Promise<EventInterface[]> { 
  try {
    const response = await api.get(`events/${searchParam}`)
    return response.data 

  } catch (error) {
    console.log(error)
  }
  return []
}

async function show(param: string): Promise<EventInterface[]> { 
  try {
    const response = await api.get(`events/${param}`)
    return response.data 
  } catch (error) {
    console.log(error)
  }
  return []
}

async function store(data : EventStoreUpdateInterface): Promise<EventInterface[]>{
  try {
    const response = await api.post('events', data)
    if(response.status === 201){
      return response.data 
    }
  } catch (error) {
    console.log(error)
  }
  return []
}

async function update(pk_data: string, data : EventStoreUpdateInterface): Promise<EventInterface[]>{
  try {
    const response = await api.put(`events/${pk_data}`, data)
    return response.data 
  } catch (error) {
    console.log(error)
  }
  return []
}

async function destroy(pk_data: string): Promise<EventInterface[]>{
  try {
    const response = await api.delete(`events/${pk_data}`)
    return response.data 
  } catch (error) {
    console.log(error)
  }
  return []
}

export const apiEvents = {
  list,
  show,
  update,
  store,
  search,
  destroy
}
