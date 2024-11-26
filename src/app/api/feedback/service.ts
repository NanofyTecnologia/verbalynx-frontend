import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { Feedback } from '@prisma/client'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { create } from './repository'

export type CreateData = Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>

async function createFeedback(data: CreateData) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return create(data)
}

export { createFeedback }
