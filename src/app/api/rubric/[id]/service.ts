import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { HttpError } from '@/helpers/http-error'
import { authOptions } from '@/lib/next-auth'

import { findByTaskId } from './repository'

async function getRubricByTaskId(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const rubric = await findByTaskId(id)

  return rubric?.criterion
}

export { getRubricByTaskId }
