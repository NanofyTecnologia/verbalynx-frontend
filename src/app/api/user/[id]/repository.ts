import { User } from '@prisma/client'
import { prisma } from '@/config/prisma'

function destroy(id: string) {
  return prisma.user.delete({
    where: {
      id,
    },
  })
}

function update(id: string, data: Partial<User>) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  })
}

export { update, destroy }
