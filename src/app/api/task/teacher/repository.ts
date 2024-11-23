import { prisma } from '@/config/prisma'

function findByTeacher(id: string) {
  return prisma.task.findMany({
    where: {
      teacherId: id,
    },
  })
}

export { findByTeacher }
