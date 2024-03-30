'use client'

import React, { FC, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from '@/constants/login-reg-exp.constant'

import styles from './Login.module.scss'
import { Layout } from '../../Layout'
import { useAction } from '@/hooks/use-action'
import { useTypedSelector } from '@/hooks/use-typed-selector'

interface ILoginForm {
  email: string
  password: string
}

export const Login: FC = () => {
  const [inputPasswordType, setInputPasswordType] = useState<'text' | 'password'>('password')
  const { register, handleSubmit } = useForm<ILoginForm>()
  const { login } = useAction()
  const { user } = useTypedSelector(state => state.auth)

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    login(data)
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <Layout>
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
    </Layout>
  )
}
