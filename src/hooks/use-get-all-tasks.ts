import { useQuery } from '@tanstack/react-query'

import { TaskService } from '@/services/task.service'
import { TypeTasksGrouping } from '@/types/task.types'

import { useTaskFilter } from './use-task-filter'

export const useGetAllTasks = (groupingParam: TypeTasksGrouping) => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => TaskService.getAll(),
    select: ({ data }) => data,
  })

  const data = useTaskFilter(groupingParam, tasks)

  return { data, isLoading }
}
