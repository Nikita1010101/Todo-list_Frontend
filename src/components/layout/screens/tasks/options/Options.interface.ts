import { Dispatch, SetStateAction } from 'react'

import { TypeTasksGrouping } from '@/types/task.types'

export interface IOptions {
  setGroupingParam: Dispatch<SetStateAction<TypeTasksGrouping>>
}
