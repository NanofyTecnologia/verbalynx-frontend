import { User } from '@prisma/client'

export type CreateUserParams = Partial<
  Pick<User, 'email' | 'graduation' | 'name' | 'classId' | 'role'>
>
export type CreateUserResponse = User

export type GetUserByIdResponse = User

export type UpdateUserParams = {
  cpf: string
  name: string
  email: string
  pronoun: string
}
