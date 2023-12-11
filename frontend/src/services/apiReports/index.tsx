import axios from "axios";
import { getUserLocalStorage } from "../../context/AuthProvider/util";


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
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return  Api 
}

async function PersonReport(param : string){
  const Api = resolveApi() 
  const params = param.toUpperCase()
  try{
    const response = await Api.get(`/v1/pessoa/relpessoa/${params}`);
    return response.data;
  }
  catch(err){
    console.log(err)
  }
	return []
}



export const apiReports = {
  PersonReport,
};
