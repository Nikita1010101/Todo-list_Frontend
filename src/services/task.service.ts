import { $axios } from "@/api/axios";
import { ITask } from "@/types/task.types";

export const TaskService = {
  async getAll() {
    return await $axios.get<ITask[]>('/task');
  }
}