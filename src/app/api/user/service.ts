import { User } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { create, findByEmail, findById, update } from './repository'
import { generateRegistrationCode } from '@/utils/generate-registration-code'

export type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
  classId: string
}

async function getUserById() {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await findById(session.user.id)
}

async function updateUser(data: Partial<CreateUserData>) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  await update(session.user.id, data)
}

async function createUser(data: CreateUserData) {
  const { email } = data

  await validateEmailExistsOrFail(email)

  const registrationCode = generateRegistrationCode()

  await create({
    ...data,
    registrationCode,
    role: data.role ?? 'PENDING_APPROVAL',
  })
}

async function validateEmailExistsOrFail(email: string) {
  const user = await findByEmail(email)

  if (user) {
    throw new HttpError('CONFLICT', HttpStatusCode.Conflict)
  }
}

export { createUser, updateUser, getUserById }
