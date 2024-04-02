'use client'

import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import cn from 'classnames'

import { IUser } from '@/types/user.type'
import { useTypedSelector } from '@/hooks/use-typed-selector'
import { PASSWORD_REG_EXP } from '@/constants/login-reg-exp.constant'
import { useCreateUser } from '@/hooks/use-create-user'
import { useGetSubordinates } from '@/hooks/use-get-subordinates'

import styles from './UserCreateForm.module.scss'
import { IUserCreateForm } from './UserCreateForm.interface'

export const UserCreateForm: FC<IUserCreateForm> = ({ closeUserCreateForm }) => {
  const [inputPasswordType, setInputPasswordType] = useState<'text' | 'password'>('password')
  const [supervisorsId, setSupervisorsId] = useState<number[]>([])
  const [subordinatesId, setSubordinatesId] = useState<number[]>([])

  const { user } = useTypedSelector(state => state.auth)
  const { register, handleSubmit, reset } = useForm<IUser>()
  const { data } = useGetSubordinates(user?.id)
  const { create } = useCreateUser()

  const addSupervisorId = (userId: number) => {
    if (supervisorsId.includes(userId)) {
      setSupervisorsId(supervisorsId.filter(id => id !== userId))
    } else {
      setSupervisorsId(prev => [...prev, userId])
    }
  }

  const addSubordinateId = (userId: number) => {
    if (subordinatesId.includes(userId)) {
      setSubordinatesId(subordinatesId.filter(id => id !== userId))
    } else {
      setSubordinatesId(prev => [...prev, userId])
    }
  }

  const onSubmit: SubmitHandler<IUser> = data => {
    if (user?.id) {
      setSupervisorsId(prev => [...prev, user?.id])
    }

    create({ ...data, supervisorsId, subordinatesId })
    reset()
    closeUserCreateForm()
  }
  return (
    <div onClick={event => event.stopPropagation()} className={styles.user_create_form}>
      <h1>Create</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input_wrapper}>
            <input type='email' placeholder='Enter email' {...register('email')} />
          </div>
          <div className={styles.input_wrapper}>
            <input
              type={inputPasswordType}
              placeholder='Enter your password'
              {...register('password', { pattern: PASSWORD_REG_EXP })}
            />
            {inputPasswordType === 'password' ? (
              <Eye onClick={() => setInputPasswordType('text')} />
            ) : (
              <EyeOff onClick={() => setInputPasswordType('password')} />
            )}
          </div>
          <div className={styles.input_wrapper}>
            <input type='text' placeholder='Enter name' {...register('name')} />
          </div>
          <div className={styles.input_wrapper}>
            <input type='text' placeholder='Enter surname' {...register('surname')} />
          </div>
          <div className={styles.input_wrapper}>
            <input type='text' placeholder='Enter patronymic' {...register('patronymic')} />
          </div>
          <input type='submit' value='Create' />
        </form>
        <div className={styles.supervisors}>
          <h2>Supervisors</h2>
          {data &&
            data.map(user => (
              <button
                onClick={() => addSupervisorId(user.id)}
                key={user.id}
                className={cn(styles.user, {
                  [styles.active]: supervisorsId.includes(user.id),
                  [styles.disabled]: subordinatesId.includes(user.id),
                })}
                disabled={subordinatesId.includes(user.id)}
              >
                {user.surname + ' ' + user.name + ' ' + user.patronymic}
              </button>
            ))}
        </div>
        <div className={styles.responsibles}>
          <h2>Subordinates</h2>
          {data &&
            data.map(user => (
              <button
                onClick={() => addSubordinateId(user.id)}
                key={user.id}
                className={cn(styles.user, {
                  [styles.active]: subordinatesId.includes(user.id),
                  [styles.disabled]: supervisorsId.includes(user.id),
                })}
                disabled={supervisorsId.includes(user.id)}
              >
                {user.surname + ' ' + user.name + ' ' + user.patronymic}
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
