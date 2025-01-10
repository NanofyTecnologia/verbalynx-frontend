import { User } from '@prisma/client'

export type GetTasksByStudentId = {
  id: string
  classId: string
}

export type GetTaskByStudentIdResponse = {
  id: string
  name: string
}[]

export type CreateUserParams = Partial<
  Pick<User, 'email' | 'graduation' | 'name' | 'classId' | 'role'>
>
export type CreateUserResponse = User

export type CreateManyUsersParams = {
  id: string | undefined
  students: CreateUserParams[]
}

export type GetUserByIdResponse = User

export type UpdateUserParams = {
  cpf: string
  name: string
  email: string
  pronoun: string
}

export type DeleteUserParams = {
  id: string
}
