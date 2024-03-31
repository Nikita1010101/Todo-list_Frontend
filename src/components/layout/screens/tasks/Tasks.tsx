'use client'

import React, { FC } from 'react'

import { TaskService } from '@/services/task.service'

export const Tasks: FC = () => {
  const send = async () => {
    const { data } = await TaskService.getAll()
    console.log(data)
  }

  return <div onClick={send}>Tasks</div>
}
