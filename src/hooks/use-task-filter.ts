import { convertDateFormat } from '@/helpers/convert-date-format'
import { ITask, TypeTasksGrouping } from '@/types/task.types'

import { useTypedSelector } from './use-typed-selector'

export const useTaskFilter = (groupingParam: TypeTasksGrouping, tasks?: ITask[]) => {
  const { user } = useTypedSelector(state => state.auth)

  return tasks?.filter(item => {
    const deadlineDate = new Date(item.deadline)
    const [todayDay, todayMonth, todayYear] = convertDateFormat(new Date()).split('.')
    const [deadlineDay, deadlineMonth, deadlineYear] = convertDateFormat(item.deadline).split('.')

    if (groupingParam === 'default') {
      if (item.userId === user?.id) {
        return item
      }
    }

    if (groupingParam === 'deadline_today') {
      if (deadlineYear === todayYear && deadlineMonth === todayMonth && deadlineDay === todayDay) {
        return item
      }
    }

    if (groupingParam === 'deadline_week') {
      const nextWeekDate = new Date()
      nextWeekDate.setDate(nextWeekDate.getDate() + 7)

      if (
        nextWeekDate.getTime() >= deadlineDate.getTime() &&
        deadlineDate.getTime() >= new Date().getTime()
      ) {
        return item
      }
    }

    if (groupingParam === 'deadline_future') {
      const nextWeekDate = new Date()
      nextWeekDate.setDate(nextWeekDate.getDate() + 7)

      if (nextWeekDate.getTime() >= deadlineDate.getTime()) {
        return item
      }
    }

    if (groupingParam === 'responsibles') {
      if (item.creatorId === user?.id) {
        return item
      }
    }
  })
}
