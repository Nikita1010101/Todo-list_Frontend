import { IUser } from "@/types/user.type";

export interface IAuthInitialState {
  user: Omit<IUser, 'password'> | null
}