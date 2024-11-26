import { prisma } from '@/config/prisma'

import { CreateData } from './service'

function create(data: CreateData) {
  return prisma.feedback.create({
    data: {},
  })
}

export { create }
