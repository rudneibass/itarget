import axios from "axios";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { Person, RequestByPerson } from './types'


function resolveApi(){
  const user = getUserLocalStorage()
  let apiUrl = user.server

  const containHttp = user.server.search('http');
  apiUrl =  containHttp === -1 ? 'https://'+user.server : apiUrl

  const barOnFinal = user.server.substr(-1)
  apiUrl =  barOnFinal === '/' ? apiUrl.slice(0,-1) : apiUrl

  
  const Api = axios.create({
    baseURL: apiUrl
  });

  Api.interceptors.request.use(
    (config) => {
      const user = getUserLocalStorage();
      config.headers.Authorization = "Bearer " + user?.token;
      //config.headers["Content-Type"] = "application/json; charset=utf-8";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return  Api 
}

async function searchPerson(param : string): Promise<Person[]> {
  const Api = resolveApi() 
  const params = param.toUpperCase()
  try{
    const response = await Api.get(`/v1/pessoa/listcidadaodetpessoa/${params}`);
    return response.data;
  }
  catch(err){
    console.log(err)
  }
	return []
}

async function requestByPerson({personId, requestType}:{personId: string, requestType: string}): Promise<RequestByPerson[]>{
    const Api = resolveApi() 
    try {
      const response = await Api.get(`/v1/atendimento/listatendimentopessoa/${personId}/${requestType}`)
      return response.data 
    } catch (error) {
      console.log(error)
    }
    return []
}

async function familyByPerson(personId: string): Promise<RequestByPerson[]>{
  const Api = resolveApi() 
  try {
    const response = await Api.get(`/v1/pessoa/listfamiliarespessoa/${personId}`)
    return response.data 
  } catch (error) {
    console.log(error)
  }
  return []
}

export const apiPerson = {
  searchPerson,
  requestByPerson,
  familyByPerson,
};
