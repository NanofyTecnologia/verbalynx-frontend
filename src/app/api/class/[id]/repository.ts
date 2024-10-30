import { prisma } from '@/config/prisma'

function getByUserId(id: string) {
  return prisma.class.findMany({
    where: {
      teacherId: id,
    },
  })
}

export { getByUserId }
