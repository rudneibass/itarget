import { baseApi } from '@services/backendApi/baseApi/index'

const path = 'registration/'
const actions = Object.fromEntries(Object.entries(baseApi.defaultActions).map(([key, value]) => [key, path + value]))
const endpoints = {
    ...actions
}

// This module extends methos from baseApi/index.tsx. 
// You can create custom methods here and add 
// into const registrationApi to expose it.

export const registrationApi = {
  ...baseApi,
    endpoints,
}