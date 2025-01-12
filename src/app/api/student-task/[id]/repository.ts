import { prisma } from '@/config/prisma'

function getByTaskId(taskId: string) {
  return prisma.studentTask.findMany({
    where: {
      taskId,
    },
  })
}

export { getByTaskId }
