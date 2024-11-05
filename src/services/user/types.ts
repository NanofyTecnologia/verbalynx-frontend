import { User } from '@prisma/client'

export type CreateUserParams = Pick<User, 'email' | 'graduation' | 'name'>
export type CreateUserResponse = User

export type GetUserByIdResponse = User
