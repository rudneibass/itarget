import axios from "axios";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { ServiceType, GroupServiceType, GroupServiceTotals } from './types'
import {dateTofrCAString}  from "../../utils";


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

async function searchService({groupName, startDate, finalDate}: {groupName?: string, startDate: string, finalDate: string}): Promise<ServiceType[]> {
  const Api = resolveApi() 
  if(groupName){    
    try {
      const groupNameU = groupName.toLocaleUpperCase()    
      const response = await Api.get(`v1/atendimento/listatendimentosgrupo/${groupNameU}/${startDate}/${finalDate}`);
      return response.data;   
    } catch (error) {
      console.log(error)
      return [] 
    }   
  }  

  if(!groupName){
    try {
      const response = await Api.get(`v1/atendimento/listatendimentosgrupodatas/${startDate}/${finalDate}`);
      return response.data;  
    } catch (error) {
      return []
    }
    
  }

  return []
}


async function searchGroupService({groupId, startDate, finalDate}: {groupId: string, startDate: string, finalDate: string}): Promise<GroupServiceType[]> {
    const Api = resolveApi()   
    const response = await Api.get(`v1/atendimento/listatendimentosservicosgrupo/${groupId}/${startDate}/${finalDate}`);
    return response.data;
}

/*async function getGroupServiceTotals({startDate, finalDate}: {startDate: string, finalDate: string}): Promise<GroupServiceTotals[]> {
  const Api = resolveApi() 
  const response = await Api.get(`v1/atendimento/listatendimentosgrupodatastotal/${startDate}/${finalDate}`);
  return response.data;
} */

async function getGroupTotals({groupName, groupId, startDate, finalDate}: {groupName?: string, groupId?: string, startDate: string, finalDate: string}): Promise<GroupServiceTotals[]> {
  const Api = resolveApi() 
  
  if(groupName){
    try {
      const response = await Api.get(`/v1/atendimento/listatendimentosgrupototal/${groupName}/${startDate}/${finalDate}`);
      return response.data; 
    } catch (error) {
      return []
    }
  }

  if(groupId){
    try {
      const response = await Api.get(`/v1/atendimento/listatendimentosservicosgrupototal/${groupId}/${startDate}/${finalDate}`);
      return response.data;
    } catch (error) {
      return []
    }    
  }

  if(!groupName && !groupId){
    try {
      const response = await Api.get(`v1/atendimento/listatendimentosgrupodatastotal/${startDate}/${finalDate}`);
      return response.data;
    } catch (error) {
      return []
    }    
  }
  return []
}

export const apiService = {
  searchService,
  searchGroupService,
  /* getGroupServiceTotals, */
  getGroupTotals
};
