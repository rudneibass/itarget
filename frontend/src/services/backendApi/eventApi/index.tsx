import { baseApi } from '@services/backendApi/baseApi/index'
 
const path = 'event/'
const actions = Object.fromEntries(Object.entries(baseApi.defaultActions).map(([key, value]) => [key, path + value]))
const endpoints = {
    ...actions
}

export const eventApi = {
  ...baseApi,
   endpoints
}
