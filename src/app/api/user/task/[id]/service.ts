import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { findTasks } from './repository'

async function getTasks(id: string, classId: string | null) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !classId) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const tasks = await findTasks(id, classId)

  return tasks?.studentTasks
}

export { getTasks }
