import { Task } from '@prisma/client'

import { prisma } from '@/config/prisma'

function findById(id: string) {
  return prisma.task.findUnique({
    where: {
      id,
    },
  })
}

function update(id: string, data: Partial<Task>) {
  return prisma.task.update({
    where: {
      id,
    },
    data,
  })
}

export { findById, update }
