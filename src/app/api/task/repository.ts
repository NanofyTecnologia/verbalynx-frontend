import { prisma } from '@/config/prisma'

import { CreateTaskData } from './service'

function create(data: CreateTaskData) {
  return prisma.task.create({
    data,
  })
}

function findAllStudentsByClassId(id: string) {
  return prisma.user.findMany({
    where: {
      classId: id,
    },
  })
}

function createStudentTasks(id: string, taskId: string) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      studentTasks: {
        connect: {
          id: taskId,
        },
      },
    },
  })
}

export { create, findAllStudentsByClassId, createStudentTasks }
