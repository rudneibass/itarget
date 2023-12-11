import axios from 'axios';
import { getUserLocalStorage } from '../context/AuthProvider/util';

export const Api = axios.create({
    baseURL: "https://jucas.fixtecnologia.com.br/api/v1/userglobal"
})

Api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage()
        config.headers.Authorization = user?.token; 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
)