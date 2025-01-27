import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { StudentTask } from '@prisma/client'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { createTask, findTaskById, findTasks, updateTask } from './repository'

async function getTasks(id: string, classId: string | null) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !classId) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const tasks = await findTasks(id, classId)

  return tasks?.studentTasks
}

async function createSendTask(id: string, data: StudentTask) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('NOT_FOUND', HttpStatusCode.NotFound)
  }

  const isDuplicatedTask = await validateDuplicatedSendTask(session.user.id, id)

  if (isDuplicatedTask) {
    return await updateTask(isDuplicatedTask.id, data)
  }

  return await createTask(id, session.user.id, data)
}

async function validateDuplicatedSendTask(userId: string, taskId: string) {
  const task = await findTaskById(taskId, userId)

  if (task) {
    return task
  }

  return false
}

export { getTasks, createSendTask }
