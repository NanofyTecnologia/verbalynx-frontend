import { prisma } from '@/config/prisma'

function getById(id: string) {
  return prisma.class.findUnique({
    where: {
      id,
    },
    include: {
      students: true,
    },
  })
}

export { getById }
