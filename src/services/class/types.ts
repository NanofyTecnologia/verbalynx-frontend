import { Class } from '@prisma/client'

export type GetClassByIdParams = {
  id: string | undefined
}

export type GetClassResponse = {
  id: string
  name: string
  period: string
  educationLevel: string
}

export type CreateClassParams = Omit<
  Class,
  'id' | 'createdAt' | 'updatedAt' | 'teacherId'
>
