import { prisma } from '@/config/prisma'

function destroy(id: string) {
  return prisma.user.delete({
    where: {
      id,
    },
  })
}

export { destroy }
