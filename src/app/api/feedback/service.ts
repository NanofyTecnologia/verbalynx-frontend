import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { create, type CreateFeedbackData } from './repository'

async function createFeedback(data: CreateFeedbackData) {
  const { taskId, classId, studentId, ...restData } = data

  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  console.log(data)

  const teacherId = session.user.id

  return create({ taskId, classId, studentId, teacherId }, { ...restData })
}

export { createFeedback }
