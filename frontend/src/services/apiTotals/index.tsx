import axios from "axios";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { TotalsType, TotalsMonthType } from './types'


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
      config.headers["Content-Type"] = "application/json; charset=utf-8";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return  Api 
}

async function searchTotalServicesYear(year : string): Promise<TotalsType[]> {
	const Api = resolveApi()
  try {
    const response = await Api.get(`v1/atendimento/totalatendimentoano/${year}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }

  return []

}

async function searchTotalServicesDay(day : string): Promise<TotalsType[]> {
	const Api = resolveApi()
  try {
    const response = await Api.get(`v1/atendimento/totaldemandasdia/${day}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
  return []
}

async function searchTotalPeopleYear(year : string): Promise<TotalsType[]> {
	const Api = resolveApi()
  try {
    const response = await Api.get(`v1/atendimento/totalatendpessoasano/${year}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }

  return []
}

async function searchTotalPeopleMonth(year : string): Promise<TotalsMonthType[]> {
	const Api = resolveApi()
  try {
    const response = await Api.get(`/v1/atendimento/totalatendpessoasmes/${year}`);
    return response.data; 
  } catch (error) {
    console.log(error)
  }

  return []
}

async function searchTotalPeopleDay(day : string): Promise<TotalsType[]> {
	const Api = resolveApi()
  try {
    const response = await Api.get(`/v1/atendimento/totalatendpessoasdia/${day}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }

  return []
}

async function searchTotalBacklogYear(year : string): Promise<TotalsType[]> {
	const Api = resolveApi()
  try {
    const response = await Api.get(`/v1/atendimento/totalpendenciasano/${year}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
  return []
}

async function searchTotalSavingsYear(year : string): Promise<TotalsType[]> {
	const Api = resolveApi()
  try {
    const response = await Api.get(`v1/atendimento/totalatendeconomiaano/${year}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
  return []
}


export const apiTotals = {
  searchTotalServicesYear,
  searchTotalServicesDay,
  searchTotalPeopleYear,
  searchTotalPeopleDay,
  searchTotalBacklogYear,
  searchTotalSavingsYear,
  searchTotalPeopleMonth,
};
