import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import {
  update,
  findById,
  createRevaluation,
  findStudentAndTaskByFeedbackId,
  type UpdateData,
  type CriterionData,
} from './repository'
import { updateStudentTaskIsCompleted } from '../service'

async function getById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id && session?.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await findById(id)
}

async function updateFeedback(id: string, data: UpdateData) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id && session?.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await update(id, data)
}

async function createRevaluationByFeedbackID(id: string, data: CriterionData) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id && session?.user.role === 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  if (!data) {
    throw new HttpError('BAD_REQUEST', HttpStatusCode.BadRequest)
  }

  const studentTask = await findStudentAndTaskByFeedbackId(id)

  if (!studentTask) {
    return await createRevaluation(id, data)
  }

  await updateStudentTaskIsCompleted({
    taskId: studentTask.taskId,
    studentId: studentTask.studentId,
  })

  return await createRevaluation(id, data)
}

export { getById, updateFeedback, createRevaluationByFeedbackID }
