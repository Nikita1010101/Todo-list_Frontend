import React, { FC, useState } from 'react'
import cn from 'classnames'

import styles from './Options.module.scss'
import { IOptions } from './Options.interface'
import { TaskCreateForm } from './task-create-form/TaskCreateForm'

export const Options: FC<IOptions> = ({ setGroupingParam }) => {
  const [isCreateForm, setIsCreateForm] = useState<boolean>(false)
  return (
    <>
      <div
        onClick={() => setIsCreateForm(false)}
        className={cn(styles.task_create_form, { [styles.active]: isCreateForm })}
      >
        <TaskCreateForm />
      </div>
      <div className={styles.options}>
        <div onClick={() => setIsCreateForm(true)} className={styles.button_add}>
          Add task
        </div>
        <div className={styles.grouping}>
          <h2>Group by:</h2>
          <div onClick={() => setGroupingParam('default')} className={styles.option}>
            For default
          </div>
          <div onClick={() => setGroupingParam('deadline_today')} className={styles.option}>
            For deadline today
          </div>
          <div onClick={() => setGroupingParam('deadline_week')} className={styles.option}>
            For deadline week
          </div>
          <div onClick={() => setGroupingParam('deadline_future')} className={styles.option}>
            For deadline future
          </div>
          <div onClick={() => setGroupingParam('responsibles')} className={styles.option}>
            For responsibles
          </div>
        </div>
      </div>
    </>
  )
}
