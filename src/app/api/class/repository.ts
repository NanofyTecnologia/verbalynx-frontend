import { prisma } from '@/config/prisma'

import { CreateClassData } from './service'

function create(data: CreateClassData) {
  return prisma.class.create({
    data,
  })
}

export { create }
