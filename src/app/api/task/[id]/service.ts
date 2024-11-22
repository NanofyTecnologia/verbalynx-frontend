import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { CreateTaskData } from '../service'

export type UpdateTaskData = Partial<CreateTaskData>

async function updateTask(id: string, data: UpdateTaskData) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await updateTask(id, data)
}

export { updateTask }
