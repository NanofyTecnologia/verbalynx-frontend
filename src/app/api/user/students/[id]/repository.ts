import { prisma } from '@/config/prisma'
import { User } from '@prisma/client'

export type CreateManyData = Omit<User, 'classId'>[]

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

export { createMany }
