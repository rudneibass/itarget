import axios from 'axios'

export const api = axios.create({
    //baseURL: import.meta.env.VITE_APP_BASE_URL
    baseURL: 'http://127.0.0.1:8000/api/'
})
