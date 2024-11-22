import { prisma } from '@/config/prisma'

function findTasks(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      studentTasks: true,
    },
  })
}

export { findTasks }
