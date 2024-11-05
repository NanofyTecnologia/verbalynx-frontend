import { User } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { create, findById } from './repository'

export type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

async function getUserById() {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const user = await findById(session.user.id)

  return user
}

async function createUser(data: CreateUserData) {
  await create({ ...data, role: 'PENDING_APPROVAL' })
}

export { createUser, getUserById }
