import { prisma } from '@/config/prisma'

import { UpdateTaskData } from './service'

function findById(id: string) {
  return prisma.task.findUnique({
    where: {
      id,
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

export { update, findById }
