import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { destroy, findById } from './repository'

import { CreateTaskData } from '../service'

export type UpdateTaskData = Omit<CreateTaskData, 'rubric'>

async function getTaskById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await findById(id)
}

async function updateTask(id: string, data: UpdateTaskData) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await updateTask(id, data)
}

async function deleteTask(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const task = await findById(id)

  if (task?.teacherId !== session.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  if (task.feedback.length > 0) {
    throw new HttpError('ERROR', HttpStatusCode.BadRequest)
  }

  await destroy(id)
}

export { getTaskById, updateTask, deleteTask }
