import { $axios } from '@/api/axios'
import { IAuthData } from '@/types/auth.types'
import { IUser } from '@/types/user.type'

export const AuthService = {
  async delete() {
    return await $axios.delete('/auth/delete')
  },

  async login(body: Pick<IUser, 'email' | 'password'>) {
    return await $axios.post<IAuthData>('/auth/login', body)
  },

  async logout() {
    return await $axios.post('/auth/logout')
  },

  async refresh() {
    return await $axios.get('/auth/refresh')
  },

  async register(body: Omit<IUser, 'id'>) {
    return await $axios.post('/auth/register', body)
  },
}
