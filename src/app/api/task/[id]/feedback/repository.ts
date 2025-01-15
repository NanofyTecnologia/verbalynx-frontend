import { prisma } from '@/config/prisma'

function getByStudentAndTaskId(studentId: string, taskId: string) {
  return prisma.feedback.findFirst({
    where: {
      taskId,
      studentId,
    },
  })
}

export { getByStudentAndTaskId }
