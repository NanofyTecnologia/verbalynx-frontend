import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { createRevaluation, type CriterionData, findById } from './repository'

async function getById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id && session?.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await findById(id)
}

async function createRevaluationByFeedbackID(id: string, data: CriterionData) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id && session?.user.role === 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  if (!data) {
    throw new HttpError('BAD_REQUEST', HttpStatusCode.BadRequest)
  }

  return await createRevaluation(id, data)
}

export { getById, createRevaluationByFeedbackID }
