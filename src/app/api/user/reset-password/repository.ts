import { prisma } from '@/config/prisma'

function update(id: string, password: string) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  })
}

export { update }
