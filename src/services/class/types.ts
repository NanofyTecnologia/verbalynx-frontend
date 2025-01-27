import { Class, User } from '@prisma/client'

export type GetClassByIdParams = {
  id: string | undefined
}

export type GetClassResponse = {
  id: string
  name: string
  period: string
  educationLevel: string
  students: User[]
  createdAt: string
  updatedAt: string
}

export type CreateClassParams = Omit<
  Class,
  'id' | 'createdAt' | 'updatedAt' | 'teacherId'
>

export type GetStundentsByClassIdResponse = {
  id: string
  name: string
}[]

export type DeleteStudentsParams = {
  id: string
}
