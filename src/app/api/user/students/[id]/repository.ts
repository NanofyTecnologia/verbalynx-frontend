import { prisma } from '@/config/prisma'
import { User } from '@prisma/client'

export type CreateManyData = Omit<User, 'classId'>[]
export type CreateUserData = Omit<User, 'classId'>

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

function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

function create(
  data: CreateUserData,
  classId: string,
  taskIds: { id: string }[],
) {
  return prisma.user.create({
    data: {
      ...data,
      studentClasses: {
        connect: {
          id: classId,
        },
      },
      studentTasks: {
        connect: taskIds.map((item) => ({
          id: item.id,
        })),
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

function findByClassId(id: string) {
  return prisma.class.findUnique({
    where: {
      id,
    },
    select: {
      tasks: {
        select: {
          id: true,
        },
      },
    },
  })
}

export { findById, findByEmail, findByClassId, create, createMany }
