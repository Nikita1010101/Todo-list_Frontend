import React, { FC, useState } from 'react'
import cn from 'classnames'

import { convertDateFormat } from '@/helpers/convert-date-format'

import styles from './TaskItem.module.scss'
import { ITaskItem } from './TaskItem.interface'
import { TaskEditForm } from './task-edit-form/TaskEditForm'
import { TaskStatus } from '@/types/task.types'

export const TaskItem: FC<ITaskItem> = task => {
  const { deadline, priority, status, title, user } = task
  const [isEditForm, setIsEditForm] = useState<boolean>(false)
  console.log(status === TaskStatus.COMPLETED)
  return (
    <>
      <div
        onClick={() => setIsEditForm(false)}
        className={cn(styles.task_edit_form, { [styles.active]: isEditForm })}
      >
        <TaskEditForm task={task} />
      </div>
      <div onClick={() => setIsEditForm(true)} className={styles.task_item}>
        <h2
          className={cn(styles.other, {
            [styles.expired]: new Date(deadline).getTime() > new Date().getTime(),
            [styles.completed]: status === TaskStatus.COMPLETED,
          })}
        >
          {title}
        </h2>
        <div className={styles.field}>
          <h3>Deadline</h3>
          <h3>{convertDateFormat(deadline)}</h3>
        </div>
        <div className={styles.field}>
          <h3>Priority</h3>
          <h3>{priority}</h3>
        </div>
        <div className={styles.field}>
          <h3>status</h3>
          <h3>{status}</h3>
        </div>
        <div className={styles.field}>
          <h3>Responsible</h3>
          <h3>{user.surname + ' ' + user.name + ' ' + user.patronymic}</h3>
        </div>
      </div>
    </>
  )
}
