import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { findById } from './repository'

async function getById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id && session?.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await findById(id)
}

export { getById }
