import axios from 'axios'
import Cookies from 'js-cookie'
import { env } from '@/config/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token: string | undefined = Cookies.get('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token', {
        path: '/',
      })

      return Promise.resolve()
    }

    return Promise.reject(error)
  }
)
