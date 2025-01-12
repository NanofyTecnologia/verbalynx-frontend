import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { sendEmail } from '../_utils/send-email'
import { findById, createMany, type CreateManyData } from './repository'

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

  const students = await createMany(data, classId)

  for (const student of students) {
    await sendEmail(student, session.user.name as string)
  }

  return students
}

export { getStudentById, createManyStudents }
