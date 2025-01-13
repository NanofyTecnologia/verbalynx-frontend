import { User } from '@prisma/client'

export type UpdateStudentParams = Partial<User>
export type UpdateStudentResponse = {
  id: string
}
