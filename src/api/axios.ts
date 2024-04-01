import axios from 'axios'

import { ACCESS_TOKEN } from '@/constants/token.constant'
import { interactWithLocalStorage } from '@/utils/interact-with-local-storage'
import { AuthService } from '@/services/auth.service'
import { authActions } from '@/store/auth/auth.slice'
import store from '@/store/store'

export const $axios = axios.create({
  baseURL: `${process.env.SERVER_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
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

    if (status === 400) {
      const message = error.response.data.message
      const warning = typeof message === 'string' ? message : message[0]
      alert(warning)
    }

    if (status === 401) {
      error.config._isRetry = true

      try {
        const { data } = await AuthService.refresh()
        console.log('🚀 ~ data:', data)

        if (!data.accessToken) return error
        interactWithLocalStorage(ACCESS_TOKEN, data.accessToken)
        store.dispatch(authActions.updateUser(data.user))

        return $axios.request(originalRequest)
      } catch (error) {
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000)

        await AuthService.logout()
      }
    }
    if (status === 500) {
      alert('Server Data Error!!!')
    }
    return error
  }
)
