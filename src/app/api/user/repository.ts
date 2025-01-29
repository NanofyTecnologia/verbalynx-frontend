import { prisma } from '@/config/prisma'

import { CreateUserData } from './service'

function create(data: CreateUserData) {
  return prisma.user.create({
    data: {
      ...data,
    },
  })
}

function update(id: string, data: Partial<CreateUserData>) {
  return prisma.user.update({
    where: {
      id,
    },
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

function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export { update, create, findById, findByEmail }
