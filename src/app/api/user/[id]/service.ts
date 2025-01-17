import { HttpStatusCode } from 'axios'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'

import { HttpError } from '@/helpers/http-error'
import { authOptions } from '@/lib/next-auth'

import { destroy, update } from './repository'

async function updateUser(id: string, data: Partial<User>) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await update(id, data)
}

async function deleteUserById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return destroy(id)
}

export { updateUser, deleteUserById }
