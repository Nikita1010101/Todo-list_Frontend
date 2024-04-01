import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TaskService } from '@/services/task.service'
import { ITask } from '@/types/task.types'

export const useEditTask = () => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: (newTask: ITask) => TaskService.edit(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return { edit: mutateAsync }
}
