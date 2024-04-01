import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TaskService } from '@/services/task.service'
import { ITask } from '@/types/task.types'

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: create } = useMutation({
    mutationFn: (task: ITask) => TaskService.create(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return { create }
}
