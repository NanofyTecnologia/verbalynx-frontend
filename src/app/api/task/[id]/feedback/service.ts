import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { getByStudentAndTaskId } from './repository'

async function getFeedback(taskId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await getByStudentAndTaskId(session.user.id, taskId)
}

export { getFeedback }
