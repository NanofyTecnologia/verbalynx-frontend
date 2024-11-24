import { prisma } from '@/config/prisma'

function findTasks(id: string, classId: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      studentTasks: {
        where: {
          classId,
        },
      },
    },
  })
}

export { findTasks }
