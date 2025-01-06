import { prisma } from '@/config/prisma'

import { UpdateTaskData } from './service'

function findById(id: string) {
  return prisma.task.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      feedback: true,
      openingDate: true,
      closingDate: true,
      rubric: true,
      objective: true,
      teacherId: true,
      classId: true,
      createdAt: true,
      updatedAt: true,
      class: {
        select: {
          name: true,
        },
      },
    },
  })
}

function update(id: string, data: UpdateTaskData) {
  return prisma.task.update({
    where: {
      id,
    },
    data,
  })
}

function destroy(id: string) {
  return prisma.task.delete({
    where: {
      id,
    },
  })
}

export { findById, update, destroy }
