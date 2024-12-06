import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { create, type CreateFeedbackData } from './repository'

async function createFeedback(data: CreateFeedbackData) {
  const {
    taskId,
    classId,
    studentId,
    teacherId: bodyTeacherId,
    feedbacks,
  } = data

  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const teacherId = session.user.id || bodyTeacherId

  const createdFeedback = await create(
    { taskId, classId, studentId, teacherId },
    feedbacks,
  )

  return {
    id: createdFeedback.id,
  }
}

export { createFeedback }
