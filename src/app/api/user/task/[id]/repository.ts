import { type StudentTask } from '@prisma/client'

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

function createTask(id: string, userId: string, data: StudentTask) {
  return prisma.studentTask.create({
    data: {
      ...data,
    },
  })
}

export { findTasks, createTask }
