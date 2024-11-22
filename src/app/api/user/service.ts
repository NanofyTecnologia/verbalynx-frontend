import { User } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { create, findByEmail, findById } from './repository'

export type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
  classId: string
}

async function getUserById() {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const user = await findById(session.user.id)

  return user
}

async function createUser(data: CreateUserData) {
  const { email } = data

  await validateEmailExistsOrFail(email)

  await create({ ...data, role: data.role ?? 'PENDING_APPROVAL' })
}

async function validateEmailExistsOrFail(email: string) {
  const user = await findByEmail(email)

  if (user) {
    throw new HttpError('CONFLICT', HttpStatusCode.Conflict)
  }
}

export { createUser, getUserById }
