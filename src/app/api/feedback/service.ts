import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import {
  create,
  findFeedbackByIds,
  type CreateFeedbackData,
} from './repository'
import { updateFeedback } from './[id]/service'
import { createRevaluation } from './[id]/repository'

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

  const hasFeedbackCreatedForStudent = await validateIsFeedbackHasCreated({
    userId: studentId,
    teamId: classId,
    taskId,
  })

  if (!hasFeedbackCreatedForStudent) {
    const createdFeedback = await create(
      { taskId, classId, studentId, teacherId },
      feedbacks,
    )

    return {
      id: createdFeedback.id,
    }
  }

  const feedbackId = hasFeedbackCreatedForStudent.id

  for (const feedback of data.feedbacks) {
    await createRevaluation(feedbackId, { ...feedback, feedbackId })
  }

  return {
    id: feedbackId,
  }
}

type ValidateFeedbackParams = {
  userId: string
  teamId: string
  taskId: string
}

async function validateIsFeedbackHasCreated({
  userId,
  teamId,
  taskId,
}: ValidateFeedbackParams) {
  const feedbackHasCreated = await findFeedbackByIds({ userId, teamId, taskId })

  if (feedbackHasCreated) {
    return feedbackHasCreated
  }

  return false
}

export { createFeedback }
