import { Task } from '@prisma/client'

export type GetTaskByIdParams = {
  id: string | undefined
}

export type GetTaskResponse = {
  id: string
  name: string
  openingDate: Date
  closingDate: Date
  rubric: {
    name: string
    evaluation: {
      name: string
      description: string
      level: number
      score: number[]
    }
  }
  objective: string
  teacherId: string
  classId: string
  feedback: {
    id: string
    taskId: string
    classId: string
    studentId: string
    isClosed: boolean
  }[]
  studentTask: {
    id: string
    title: string
    studentId: string
    isCompleted: boolean
    createdAt: Date
    updatedAt: Date
    student: {
      name: string
      studentFeedback: {
        id: string
      }[]
    }
  }[]
  createdAt: string
  updatedAt: string
  class: {
    name: string
  }
}

export type GetFeedbackByTaskIdResponse = {
  id: string
}

export type CreateTaskParams = Omit<
  Task,
  'id' | 'createdAt' | 'updatedAt' | 'teacherId'
> & {
  rubric: {
    name: string
    evaluation: {
      name: string
      description: string
      level: number
      score: number[]
    }[]
  }
}

export type DeleteTaskParams = {
  id: string | undefined
}
