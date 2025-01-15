import { prisma } from '@/config/prisma'
import { User } from '@prisma/client'

export type CreateManyData = Omit<User, 'classId'>[]

function findById(id: string, teacherId: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      cpf: true,
      pronoun: true,
      graduation: true,
      class: {
        select: {
          name: true,
        },
      },
      studentFeedback: true,
      StudentTask: {
        select: {
          isCompleted: true,
          task: {
            select: {
              id: true,
              name: true,
              class: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        where: {
          task: {
            teacherId,
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
