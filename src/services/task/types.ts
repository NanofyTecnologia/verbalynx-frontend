import { Task } from '@prisma/client'

export type GetTaskByIdParams = {
  id: string | undefined
}

export type GetTaskResponse = {
  id: string
  name: string
  openingDate: Date
  closingDate: Date
  rubric: string
  level: string
  objective: string
  teacherId: string
  classId: string
  createdAt: string
  updatedAt: string
  class: {
    name: string
  }
}

export type CreateTaskParams = Omit<
  Task,
  'id' | 'createdAt' | 'updatedAt' | 'teacherId'
>
