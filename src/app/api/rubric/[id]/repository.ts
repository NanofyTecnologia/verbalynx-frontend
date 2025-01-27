import { prisma } from '@/config/prisma'

function findByTaskId(id: string) {
  return prisma.rubric.findUnique({
    where: {
      taskId: id,
    },
    select: {
      id: true,
      name: true,
      criterion: {
        select: {
          id: true,
          name: true,
          comment: true,
          description: true,
          level: true,
          score: true,
        },
      },
    },
  })
}

export { findByTaskId }
