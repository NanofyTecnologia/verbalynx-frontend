import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import {
  create,
  type CreateFeedbackData,
  type CreateFeedbackCriterionData,
} from './repository'

async function createFeedback(
  data: CreateFeedbackData & { feedbacks: CreateFeedbackCriterionData },
) {
  const { taskId, classId, studentId, feedbacks } = data

  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const teacherId = session.user.id

  return create({ taskId, classId, studentId, teacherId }, feedbacks)
}

export { createFeedback }
