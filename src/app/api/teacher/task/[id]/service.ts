import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { Criterion, Rubric, Task } from '@prisma/client'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { findById, update, updateRubric, upsertCriterion } from './repository'

async function updateTask(
  id: string,
  data: Partial<Task> & {
    rubric: Partial<Rubric>
    criterion: Partial<Criterion>[]
  },
) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await validateUserIsOwner(id, session.user.id)

  const { rubric, criterion, ...restData } = data
  const updatedTask = await update(id, restData)

  const rubricId = updatedTask.rubric?.id

  if (!rubricId) {
    return {
      id: rubricId,
    }
  }

  await updateRubric(rubricId, rubric)
  await upsertCriterion(rubricId, criterion)

  return {
    id: rubricId,
  }
}

async function validateUserIsOwner(taskId: string, userId: string) {
  const task = await findById(taskId)

  if (task?.teacherId !== userId) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }
}

export { updateTask }
