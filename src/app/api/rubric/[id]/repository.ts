import { prisma } from '@/config/prisma'

function findByTaskId(id: string) {
  return prisma.rubric.findUnique({
    where: {
      taskId: id,
    },
    select: {
      evaluation: true,
    },
  })
}

export { findByTaskId }
