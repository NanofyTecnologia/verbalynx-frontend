import { prisma } from '@/config/prisma'
import { User } from '@prisma/client'

export type CreateManyData = Omit<User, 'classId'>[]

function findById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      class: {
        select: {
          name: true,
        },
      },
      StudentTask: {
        select: {
          isCompleted: true,
          task: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
}

function createMany(data: CreateManyData, classId: string) {
  return prisma.$transaction(
    data.map((item) =>
      prisma.user.create({
        data: {
          ...item,
          studentClasses: {
            connect: {
              id: classId,
            },
          },
        },
      }),
    ),
  )
}

export { findById, createMany }
