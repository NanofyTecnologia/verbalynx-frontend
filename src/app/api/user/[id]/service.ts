import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { HttpError } from '@/helpers/http-error'
import { authOptions } from '@/lib/next-auth'

import { destroy } from './repository'

async function deleteUserById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return destroy(id)
}

export { deleteUserById }
