import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ITask } from '@/types/task.types'
import { useEditTask } from '@/hooks/use-edit-task'

import styles from './TaskEditForm.module.scss'
import { ITaskEditForm } from './TaskEditForm.interface'

export const TaskEditForm: FC<ITaskEditForm> = ({ task }) => {
  const { register, handleSubmit } = useForm<ITask>({ defaultValues: task })
  const { edit } = useEditTask()

  const onSubmit: SubmitHandler<ITask> = data => {
    console.log(data)
    edit(data)
  }
  return (
    <div onClick={event => event.stopPropagation()} className={styles.task_edit_form}>
      <h1>Edit</h1>
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
    </div>
  )
}
