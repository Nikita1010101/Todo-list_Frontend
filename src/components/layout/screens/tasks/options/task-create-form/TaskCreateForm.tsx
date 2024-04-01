import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ITask } from '@/types/task.types'
import { useCreateTask } from '@/hooks/use-create-task'

import styles from './TaskCreateForm.module.scss'
import { useGetSubordinates } from '@/hooks/use-get-subordinates'

export const TaskCreateForm: FC = () => {
  const { register, handleSubmit } = useForm<ITask>()
  const { data } = useGetSubordinates()
  console.log('🚀 ~ data:', data)
  const { create } = useCreateTask()

  const onSubmit: SubmitHandler<ITask> = data => {
    create(data)
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
          <input type='submit' value='Edit' />
        </form>
        <div className='responsibles'>{}</div>
      </div>
    </div>
  )
}
