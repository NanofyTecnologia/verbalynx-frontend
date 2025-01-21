import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { createStudents, deleteStudent } from './repository'

async function createStudentsInTeam(
  id: string,
  data: { studentsIds: string[] },
) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await createStudents(id, data.studentsIds)
}

async function deleteStudentsInTeam(id: string, userId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await deleteStudent(id, userId)
}

export { createStudentsInTeam, deleteStudentsInTeam }
