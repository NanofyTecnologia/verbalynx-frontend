import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { destroy, findById } from './repository'

async function deleteClass(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session?.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const team = await findById(id)

  if (session.user.id !== team?.teacherId) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await destroy(id)
}

export { deleteClass }
