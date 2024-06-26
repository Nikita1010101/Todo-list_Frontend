import { IUser } from './user.type'

export enum TaskPriority {
  LOW = 'LOW',
  MIDDLE = 'MIDDLE',
  HIGH = 'HIGH',
}

export enum TaskStatus {
  AWAITS = 'AWAITS',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export interface ITask {
  id: number
  updatedAt: Date
  title: string
  description: string
  deadline: Date
  priority: TaskPriority
  status: TaskStatus
  userId: number
  user: IUser
  creatorId: number
}

export type TypeTasksGrouping =
  | 'default'
  | 'deadline_today'
  | 'deadline_week'
  | 'deadline_future'
  | 'responsibles'
