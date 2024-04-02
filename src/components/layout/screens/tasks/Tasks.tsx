'use client'

import React, { FC, useState } from 'react'

import { useGetAllTasks } from '@/hooks/use-get-all-tasks'
import { ITask, TypeTasksGrouping } from '@/types/task.types'

import styles from './Task.module.scss'
import { TaskItem } from './task-item/TaskItem'
import { Options } from './options/Options'

export const Tasks: FC = () => {
  const [groupingParam, setGroupingParam] = useState<TypeTasksGrouping>('default')
  const { data } = useGetAllTasks(groupingParam)

  return (
    <div className={styles.task}>
      <Options setGroupingParam={setGroupingParam} />
      <div className={styles.list}>
        {data && data.map(item => <TaskItem key={item.id} {...item} />)}
      </div>
    </div>
  )
}
