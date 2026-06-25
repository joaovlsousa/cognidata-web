import axios from 'axios'
import cookies from 'js-cookie'
import { env } from '@/config/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      cookies.remove('role', {
        path: '/',
      })

      return Promise.resolve()
    }

    return Promise.reject(error)
  }
)
