import { prisma } from '@/config/prisma'
import { User } from '@prisma/client'

function update(id: string, data: Partial<User>) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  })
}

export { update }
