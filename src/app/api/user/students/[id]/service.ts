import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { customAlphabet } from 'nanoid'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'
import { generateRegistrationCode } from '@/utils/generate-registration-code'

import { sendEmail } from '../_utils/send-email'
import {
  create,
  findById,
  findByEmail,
  findByClassId,
  type CreateManyData,
} from './repository'

async function getStudentById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await findById(id, session.user.id)
}

async function createManyStudents(data: CreateManyData, classId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const team = await findByClassId(classId)

  const tasks = team ? (team.tasks.length === 0 ? [] : team?.tasks) : []

  for (const student of data) {
    let registrationCode = student.registrationCode
    const isEmailDuplicated = await findByEmail(student.email)

    if (isEmailDuplicated) {
      continue
    }

    if (!registrationCode) {
      registrationCode = generateRegistrationCode()
    }

    const createdStudent = await create(
      { ...student, registrationCode },
      classId,
      tasks,
    )

    await sendEmail(createdStudent, session.user.name as string)
  }
}

export { getStudentById, createManyStudents }
