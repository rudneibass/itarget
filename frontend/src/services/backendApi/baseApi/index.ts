import axios from 'axios'
import { utils } from '../utils';

const api = axios.create({
  //baseURL: import.meta.env.VITE_APP_BASE_URL
  baseURL: 'http://localhost:81/api'
})

function resolvePath(urlPath: string){
  return urlPath.split('/')[1]
}

async function executeRequest(requestFunction: () => Promise<unknown>): Promise<unknown> {
  try {
    return await requestFunction();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(utils.jsonToHtmlList(JSON.stringify(error.response?.data)))
    }
    throw new Error('Erro ao tentar obter dados da api.')
  }
}

async function create(endpoint: string, params: object){
  return await executeRequest(async () =>{
    return await api.post(endpoint, params)
  })
}

async function search(endpoint: string, searchParams?: object) { 
  return await executeRequest(async () => {
    console.log(endpoint)
    return await api.get(endpoint, {
      params: searchParams
    })
  })
}

async function list(endpoint: string){
  return await executeRequest(async () => {
    return await api.get(endpoint)
  })
}

async function paginate(endpoint: string, itemsPerPage = 10){
  return await executeRequest(async () => {
    return await api.get(`${endpoint}${itemsPerPage}`)
  })
}

async function get(endpoint: string, pk_data: string){
  return await executeRequest(async () => {
    return await api.get(`${endpoint}${pk_data}`)
  })
}

async function update({ endpoint, id, data } : { endpoint: string, id: string, data: object}){
  return await executeRequest(async () => {
    return await api.put(`${endpoint}/${id}`, data)
  })
}

async function remove(endpoint: string, pk_data: string){
  return await executeRequest(async () => {
    return await api.delete(`${endpoint}/${pk_data}`)
  })
}

async function getForm({ endpoint, formName } : { endpoint: string, formName?:string }) {
  return await executeRequest(async () => {
    const form_name = formName || ''
    const response = await api.get(endpoint, { params: { form_name } })
    return response.data
  })
}

async function getFormWithValues({ endpoint, formName, id } : { endpoint: string, formName: string, id: string }) {
  return await executeRequest(async () => {
    const response = await api.get(endpoint, { params: { form_name: formName, id: id }})
    return response.data
  })
}

const defaultActions = {
  list: "/list",
  get: "/get",
  create: "/create",
  edit: "/edit",
  update: "/update",
  delete: "/delete",
  search: "/search",
  paginate: "/paginate",
  formCreate: "/form/create",
  formEdit: "/form/edit"
}

export const baseApi = {
  api
  ,defaultActions
  ,executeRequest
  ,resolvePath
  ,list
  ,get
  ,paginate
  ,update
  ,create
  ,search
  ,remove
  ,getForm
  ,getFormWithValues
}
