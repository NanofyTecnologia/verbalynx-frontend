import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'

import { HttpError } from '@/helpers/http-error'
import { destroy } from './repository'

async function deleteVideo(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'ADMIN') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await destroy(id)
}

export { deleteVideo }
