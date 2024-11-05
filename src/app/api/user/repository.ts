import { prisma } from '@/config/prisma'

import { CreateUserData } from './service'

function create(data: CreateUserData) {
  return prisma.user.create({
    data,
  })
}

function findById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export { create, findById }
