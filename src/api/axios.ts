import axios from 'axios'

import { ACCESS_TOKEN } from '@/constants/token.constant'
import { interactWithLocalStorage } from '@/utils/interact-with-local-storage'
import { AuthService } from '@/services/auth.service'
import { authActions } from '@/store/auth/auth.slice'

export const $axios = axios.create({
  baseURL: 'http://localhost:4200/api',
  withCredentials: true,
})

$axios.interceptors.request.use(req => {
  req.headers.Authorization = `Bearer ${interactWithLocalStorage(ACCESS_TOKEN)}`
  return req
})

$axios.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config
    const status = error.response?.status

    if (!status || !error.config || error.config._isRetry) return error

    if (status === 401) {
      error.config._isRetry = true

      try {
        const { data } = await AuthService.refresh()

        if (!data.accessToken) return error
        interactWithLocalStorage(ACCESS_TOKEN, data.accessToken)

        authActions.updateUser(data)
        
        return $axios.request(originalRequest)
      } catch (error) {
        await AuthService.logout()
        window.location.href = '/login'
      }
    }
    if (status === 500) {
      alert('Server Data Error!!!')
    }
    return error
  }
)
