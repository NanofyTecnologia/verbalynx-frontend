import { prisma } from '@/config/prisma'

import { CreateTaskData } from './service'

function create(data: CreateTaskData) {
  return prisma.task.create({
    data,
  })
}

export { create }
