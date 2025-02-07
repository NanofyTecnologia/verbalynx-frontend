import { compareSync } from 'bcrypt'
import { HttpStatusCode } from 'axios'
import { type User } from '@prisma/client'

import { HttpError } from '@/helpers/http-error'

import { findByEmail } from './repository'

async function authenticateUser(data: Pick<User, 'email' | 'password'>) {
  const { email, password } = data

  if (!password) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const user = await validateUserExists({ email })

  await validatePasswordMatch({ password, dbPassword: user.password })

  return user
}

async function validateUserExists({ email }: Pick<User, 'email'>) {
  const user = await findByEmail({ email })

  if (!user) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return user
}

async function validatePasswordMatch({
  password,
  dbPassword,
}: {
  password?: string | null
  dbPassword?: string | null
}) {
  if (!password || !dbPassword) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const passwordIsMatch = compareSync(password, dbPassword)

  if (!passwordIsMatch) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }
}

export { authenticateUser }
