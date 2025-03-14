import { baseApi } from '../baseApi/index'

const path = 'field/'
const actions = Object.fromEntries(Object.entries(baseApi.defaultActions).map(([key, value]) => [key, path + value]))
const endpoints = {
    ...actions,
}

// This module extends methos from baseApi/index.tsx. 
// You can create custom methods here and add 
// into const fielApi to expose it.

export const fieldApi = {
  ...baseApi,
   endpoints
}