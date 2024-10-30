import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { Class } from '@prisma/client'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { create } from './repository'

export type CreateClassData = Omit<Class, 'id' | 'createdAt' | 'updatedAt'>

async function createClass(data: CreateClassData) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const createdClass = await create({ ...data, teacherId: session.user.id })

  if (!createdClass) {
    throw new HttpError(
      'INTERNAL_SERVER_ERROR',
      HttpStatusCode.InternalServerError,
    )
  }

  return createdClass
}

export { createClass }
