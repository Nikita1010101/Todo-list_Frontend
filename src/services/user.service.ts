import { $axios } from "@/api/axios"
import { IUser } from "@/types/user.type"

export const UserService = {
  async getAllSubordinates(userId?: number) {
    return await $axios.get<IUser[]>(`/user/${userId}/subordinates`)
  }
}