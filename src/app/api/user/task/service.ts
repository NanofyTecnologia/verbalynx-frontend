import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { findTasks } from './repository'

async function getTasks() {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const tasks = await findTasks(session.user.id)

  return tasks?.studentTasks
}

export { getTasks }
