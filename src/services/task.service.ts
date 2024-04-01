import { $axios } from '@/api/axios'
import { ITask } from '@/types/task.types'

export const TaskService = {
  async getAll() {
    return await $axios.get<ITask[]>('/task')
  },

  async edit(task: ITask) {
    return await $axios.patch<ITask>(`/task/${task.id}`, task)
  },

  async create(task: ITask) {
    return await $axios.post<ITask>('/task', task)
  },
}
