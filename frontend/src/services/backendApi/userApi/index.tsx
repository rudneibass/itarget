import { baseApi } from '@services/backendApi/baseApi/index'

const path = 'user/'
const actions = Object.fromEntries(Object.entries(baseApi.defaultActions).map(([key, value]) => [key, path + value]))
const endpoints = {
    ...actions
}

// This module extends methos from baseApi/index.tsx. 
// You can create custom methods here and add 
// into const userApi to expose it.

export const userApi = {
  ...baseApi,
    endpoints,
}