import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import {
  createStudents,
  deleteStudent,
  findTeamById,
  updateStudent,
} from './repository'

async function createStudentsInTeam(
  id: string,
  data: { studentsIds: string[] },
) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const team = await validateClassExists(id)
  const tasks = team ? (team.tasks.length === 0 ? [] : team?.tasks) : []

  await createStudents(id, data.studentsIds)

  for (const students of data.studentsIds) {
    await updateStudent(students, tasks)
  }
}

async function deleteStudentsInTeam(id: string, userId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await deleteStudent(id, userId)
}

async function validateClassExists(id: string) {
  const team = await findTeamById(id)

  if (!team) {
    throw new HttpError('NOT_FOUND', HttpStatusCode.NotFound)
  }

  return team
}

export { createStudentsInTeam, deleteStudentsInTeam }
