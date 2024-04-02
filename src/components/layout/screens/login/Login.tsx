'use client'

import React, { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from '@/constants/login-reg-exp.constant'
import { useAction } from '@/hooks/use-action'
import { useTypedSelector } from '@/hooks/use-typed-selector'
import { ILogin } from '@/types/auth.types'

import styles from './Login.module.scss'
import { useRouter } from 'next/navigation'

export const Login: FC = () => {
  const router = useRouter()
  const [inputPasswordType, setInputPasswordType] = useState<'text' | 'password'>('password')
  const { register, handleSubmit } = useForm<ILogin>()
  const { login } = useAction()
  const { user } = useTypedSelector(state => state.auth)

  const onSubmit: SubmitHandler<ILogin> = data => {
    login(data)
  }

  useEffect(() => {
    if (!user) return
    router.push('/')
  }, [router, user])

  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input_wrapper}>
          <input
            type='email'
            placeholder='Enter  your email'
            {...register('email', { pattern: EMAIL_REG_EXP })}
          />
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
        <input type='submit' value={'Log in'} />
      </form>
    </div>
  )
}
