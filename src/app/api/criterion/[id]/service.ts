import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { destroy, findById } from './repository'

async function deleteCriterion(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await validateHasFeedbackCriterion(id)

  return await destroy(id)
}

async function validateHasFeedbackCriterion(id: string) {
  const hasFeedbackCriterion = await findById(id)

  if (
    hasFeedbackCriterion &&
    hasFeedbackCriterion?.FeedbackCriterion.length > 0
  ) {
    throw new HttpError('BAD_REQUEST', HttpStatusCode.BadRequest)
  }
}

export { deleteCriterion }
