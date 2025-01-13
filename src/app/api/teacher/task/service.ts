import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { Task } from '@prisma/client'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { findById, update } from './repository'

async function updateTask(id: string, data: Partial<Task>) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await validateUserIsOwner(id, session.user.id)

  return await update(id, data)
}

async function validateUserIsOwner(taskId: string, userId: string) {
  const task = await findById(taskId)

  if (task?.teacherId !== userId) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }
}

export { updateTask }
