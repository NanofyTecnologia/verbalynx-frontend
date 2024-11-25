import { prisma } from '@/config/prisma'

function findByTaskId(id: string) {
  return prisma.rubric.findUnique({
    where: {
      taskId: id,
    },
    select: {
      id: true,
      name: true,
      evaluation: {
        select: {
          name: true,
          description: true,
          level: true,
          score: true,
        },
      },
    },
  })
}

export { findByTaskId }
