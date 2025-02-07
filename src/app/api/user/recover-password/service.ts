import { HttpStatusCode } from 'axios'
import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'

import { env } from '@/lib/env/index.mjs'
import { HttpError } from '@/helpers/http-error'

import { findByEmail } from '../repository'
import { sendEmailRecover } from './send-email-recover'

async function sendEmailToRecoverPassword({ email }: Pick<User, 'email'>) {
  const user = await validateEmailExists(email)

  const token = jwt.sign({ id: user?.id }, env.NEXTAUTH_SECRET, {
    expiresIn: 60 * 5,
  })

  await sendEmailRecover({ name: user?.name, email: user?.email, token })
}

async function validateEmailExists(email: string) {
  const user = await findByEmail(email)

  if (!user) {
    throw new HttpError('Usuário não encontrado.', HttpStatusCode.NotFound)
  }

  return user
}

export { sendEmailToRecoverPassword }
