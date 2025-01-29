import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { User } from '@prisma/client'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { update } from './repository'

async function updateStudent(id: string, data: Partial<User>) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await update(id, data)
}

export { updateStudent }
