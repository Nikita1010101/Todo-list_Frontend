'use client'

import React, { FC, useState } from 'react'
import cn from 'classnames'

import { useAction } from '@/hooks/use-action'

import styles from './Options.module.scss'
import { IOptions } from './Options.interface'
import { TaskCreateForm } from './task-create-form/TaskCreateForm'
import { UserCreateForm } from './user-create-form/UserCreateForm'

export const Options: FC<IOptions> = ({ setGroupingParam }) => {
  const [isCreateUserForm, setIsCreateUserForm] = useState<boolean>(false)
  const [isCreateTaskForm, setIsCreateTaskForm] = useState<boolean>(false)
  const { logout } = useAction()

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  const closeUserCreateForm = () => {
    setIsCreateUserForm(false)
  }

  const closeTaskCreateForm = () => {
    setIsCreateTaskForm(false)
  }

  return (
    <>
      <div
        onClick={() => setIsCreateUserForm(false)}
        className={cn(styles.user_create_form, { [styles.active]: isCreateUserForm })}
      >
        <UserCreateForm closeUserCreateForm={closeUserCreateForm} />
      </div>
      <div
        onClick={() => setIsCreateTaskForm(false)}
        className={cn(styles.task_create_form, { [styles.active]: isCreateTaskForm })}
      >
        <TaskCreateForm closeTaskCreateForm={closeTaskCreateForm} />
      </div>
      <div className={styles.options}>
        <div className={styles.user_options}>
          <button onClick={() => setIsCreateUserForm(true)} className={styles.button_create_user}>
            Create user
          </button>
          <button onClick={handleLogout} className={styles.button_logout}>
            Log out
          </button>
        </div>
        <button onClick={() => setIsCreateTaskForm(true)} className={styles.button_add}>
          Add task
        </button>
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
