import { User } from '@prisma/client'
import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { genSaltSync, hashSync } from 'bcrypt'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'
import { generateRegistrationCode } from '@/utils/generate-registration-code'

import { create, findByEmail, findById, update } from './repository'

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
  const { email, password } = data

  const saltRounds = 12
  const salt = genSaltSync(saltRounds)
  const hashedPassword = hashSync(password, salt)

  await validateEmailExistsOrFail(email)

  const registrationCode = generateRegistrationCode()

  await create({
    ...data,
    registrationCode,
    password: hashedPassword,
    role: data.role ?? 'PENDING_APPROVAL',
  })
}

async function validateEmailExistsOrFail(email: string) {
  const user = await findByEmail(email)

  if (user) {
    throw new HttpError('E-mail já cadastrado', HttpStatusCode.Conflict)
  }
}

export { createUser, updateUser, getUserById, validateEmailExistsOrFail }
