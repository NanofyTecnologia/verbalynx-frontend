import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { findAll } from './repository'

type IParams = {
  teamId: string | null
}

async function getAllStudents(props: IParams) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role === 'STUDENT') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await findAll(props)
}

export { getAllStudents }
