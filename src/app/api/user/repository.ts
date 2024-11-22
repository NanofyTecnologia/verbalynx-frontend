import { prisma } from '@/config/prisma'

import { CreateUserData } from './service'

function create(data: CreateUserData) {
  return prisma.user.create({
    data: {
      ...data,
      studentClasses: {
        connect: {
          id: data.classId,
        },
      },
    },
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

export { create, findById, findByEmail }
