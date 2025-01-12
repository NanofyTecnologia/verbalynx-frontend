import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { getByTaskId } from './repository'

async function getStudentTask(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role === 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await getByTaskId(id)
}

export { getStudentTask }
