import { HttpStatusCode } from 'axios'
import { genSaltSync, hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken'

import { env } from '@/lib/env/index.mjs'
import { HttpError } from '@/helpers/http-error'

import { findById } from '../repository'
import { update } from './repository'

type ResetPasswordData = {
  token: string
  password: string
}

type Payload = {
  id: string
}

async function resetPassword(data: ResetPasswordData) {
  const { token, password } = data

  const { id } = jwt.verify(token, env.NEXTAUTH_SECRET) as Payload

  if (!id) {
    throw new HttpError('Token inválido.', HttpStatusCode.BadRequest)
  }

  await validateUserExists(id)

  const saltRounds = 12
  const salt = genSaltSync(saltRounds)
  const hashedPassword = hashSync(password, salt)

  await update(id, hashedPassword)
}

async function validateUserExists(id: string) {
  const user = await findById(id)

  if (!user) {
    throw new HttpError('Usuário não encontrado.', HttpStatusCode.Unauthorized)
  }

  return user
}

export { resetPassword }
