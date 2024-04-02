import axios, { AxiosResponse } from 'axios'

import { $axios } from '@/api/axios'
import { IAuthData, IRegister } from '@/types/auth.types'
import { IUser } from '@/types/user.type'

export const AuthService = {
  async delete() {
    return await $axios.delete<null>('/auth/delete')
  },

  async login(body: Pick<IUser, 'email' | 'password'>) {
    return await $axios.post<IAuthData>('/auth/login', body)
  },

  async logout() {
    return await axios.post<null>(
      `${process.env.SERVER_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    )
  },

  async refresh() {
    return await axios.get<IAuthData>(`${process.env.SERVER_URL}/api/auth/refresh`, {
      withCredentials: true,
    })
  },

  async register(body: IRegister) {
    return await axios.post<IAuthData, AxiosResponse<IUser>, IRegister>(
      `${process.env.SERVER_URL}/api/auth/register`,
      body,
      {
        withCredentials: true,
      }
    )
  },
}
