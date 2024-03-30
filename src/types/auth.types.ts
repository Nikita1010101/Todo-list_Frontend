import { IUser } from "./user.type";

export interface IAuthData {
  user: Omit<IUser, 'password'>
  accessToken: string
  refreshToken: string
} 