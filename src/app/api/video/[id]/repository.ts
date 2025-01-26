import { prisma } from '@/config/prisma'

function destroy(id: string) {
  return prisma.videos.delete({
    where: {
      id,
    },
  })
}

export { destroy }
