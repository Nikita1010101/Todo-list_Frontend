'use client'

import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'

import { ITask } from '@/types/task.types'
import { useCreateTask } from '@/hooks/use-create-task'
import { useGetSubordinates } from '@/hooks/use-get-subordinates'
import { useTypedSelector } from '@/hooks/use-typed-selector'

import styles from './TaskCreateForm.module.scss'
import { ITaskCreateForm } from './TaskCreateForm.interface'

export const TaskCreateForm: FC<ITaskCreateForm> = ({ closeTaskCreateForm }) => {
  const [responsibleId, setResponsibleId] = useState<number | null>(null)
  const { user } = useTypedSelector(state => state.auth)
  const { register, handleSubmit, reset } = useForm<ITask>()
  const { data } = useGetSubordinates(user?.id)
  const { create } = useCreateTask()

  const onSubmit: SubmitHandler<ITask> = data => {
    if (!responsibleId || !user?.id) return
    create({ ...data, userId: responsibleId, creatorId: user.id })
    reset()
    closeTaskCreateForm()
  }

  return (
    <div onClick={event => event.stopPropagation()} className={styles.task_create_form}>
      <h1>Create</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input_wrapper}>
            <input
              type='text'
              placeholder='Enter deadline'
              {...register('deadline', { pattern: /\d\d\d\d-\d\d-\d\d/g })}
            />
          </div>
          <div className={styles.input_wrapper}>
            <input type='text' placeholder='Enter description' {...register('description')} />
          </div>
          <div className={styles.input_wrapper}>
            <input type='text' placeholder='Enter priority' {...register('priority')} />
          </div>
          <div className={styles.input_wrapper}>
            <input type='text' placeholder='Enter status' {...register('status')} />
          </div>
          <div className={styles.input_wrapper}>
            <input type='text' placeholder='Enter title' {...register('title')} />
          </div>
          <input type='submit' value='Create' />
        </form>
        <div className={styles.responsibles}>
          {data &&
            data.map(user => (
              <div
                onClick={() => setResponsibleId(user.id)}
                key={user.id}
                className={cn(styles.responsible, { [styles.active]: user.id === responsibleId })}
              >
                {user.surname + ' ' + user.name + ' ' + user.patronymic}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
