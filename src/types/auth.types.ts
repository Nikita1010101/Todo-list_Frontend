import { IUser } from './user.type'

export interface IAuthData {
  user: Omit<IUser, 'password'>
  accessToken: string
  refreshToken: string
}

export interface IRegister extends IUser {
  supervisorsId: number[]
  subordinatesId: number[]
}

export interface ILogin extends Pick<IUser, 'email' | 'password'> {}
