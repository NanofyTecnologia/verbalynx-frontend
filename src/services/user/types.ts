import { User } from '@prisma/client'

export type CreateUserParams = Partial<
  Pick<User, 'email' | 'graduation' | 'name' | 'classId' | 'role'>
>
export type CreateUserResponse = User

export type GetUserByIdResponse = User
