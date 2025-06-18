import axios, { AxiosInstance } from 'axios'
import Environment from '@/config/env'
import { AuthService } from './auth.service'

function getAPIClient(): AxiosInstance {
   const api = axios.create({
      baseURL: Environment.VITE_API_URL,
      headers: {
         'Content-Type': 'application/json',
      },
   })

   api.interceptors.request.use(async (config) => {
      const { accessToken } = AuthService.getTokens()

      if (accessToken) {
         config.headers['Authorization'] = `Bearer ${accessToken}`
      }

      return config
   })

   return api
}

export const api = getAPIClient()
