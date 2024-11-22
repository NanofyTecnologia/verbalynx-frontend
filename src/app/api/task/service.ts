import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { Task } from '@prisma/client'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { create } from './repository'

export type CreateTaskData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

async function createTask(data: CreateTaskData) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const createdTask = await create({ ...data, teacherId: session.user.id })

  if (!createdTask) {
    throw new HttpError(
      'INTERNAL_SERVER_ERROR',
      HttpStatusCode.InternalServerError,
    )
  }

  return createdTask
}

export { createTask }
