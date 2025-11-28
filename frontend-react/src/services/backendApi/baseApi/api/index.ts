import axios from 'axios'

export { axios }
export const api = axios.create({
  //baseURL: import.meta.env.VITE_APP_BASE_URL
  baseURL: 'http://localhost:81/api'
})
