import { prisma } from '@/config/prisma'
import { type User } from '@prisma/client'

function findByEmail({ email }: Pick<User, 'email'>) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export { findByEmail }
