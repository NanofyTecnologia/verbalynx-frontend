import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { Rubric, Task } from '@prisma/client'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { findById, update, updateRubric } from './repository'

async function updateTask(
  id: string,
  data: Partial<Task> & { rubric: Partial<Rubric> },
) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await validateUserIsOwner(id, session.user.id)

  const { rubric, ...restData } = data
  const updatedTask = await update(id, restData)

  if (!updatedTask.rubric) {
    return {
      id,
    }
  }
  await updateRubric(updatedTask.rubric.id, rubric)

  return {
    id,
  }
}

async function validateUserIsOwner(taskId: string, userId: string) {
  const task = await findById(taskId)

  if (task?.teacherId !== userId) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }
}

export { updateTask }
