import { User, Task, Rubric } from '@prisma/client'

export type UpdateStudentParams = Partial<User>
export type UpdateStudentResponse = {
  id: string
}

export type UpdateTaskParams = Partial<
  Omit<Task, 'openingDate' | 'closingDate'>
> & {
  openingDate: string | Date
  closingDate: string | Date
  rubric: Partial<Rubric>
}
export type UpdateTaskResponse = {
  id: string
}

export type CreateStudentsInTeam = {
  id: string
  studentsIds: string[]
}
