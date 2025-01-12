import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { findTaskById, findTeamById, findUserById } from './repository'

type FeedbackDetailParams = {
  userId: string | null
  teamId: string | null
  taskId: string | null
}

async function getFeedbackDetails({
  userId,
  teamId,
  taskId,
}: FeedbackDetailParams) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  if (!userId || !teamId || !taskId) {
    throw new HttpError('NOT_FOUND', HttpStatusCode.NotFound)
  }

  const user = await findUserById(userId)
  const team = await findTeamById(teamId)
  const task = await findTaskById(taskId)

  return {
    user,
    team,
    task,
  }
}

export { getFeedbackDetails }
