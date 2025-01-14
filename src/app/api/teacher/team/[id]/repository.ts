import { prisma } from '@/config/prisma'

function createStudents(id: string, data: string[]) {
  return prisma.$transaction(
    data.map((item) =>
      prisma.class.update({
        where: {
          id,
        },
        data: {
          students: {
            connect: {
              id: item,
            },
          },
        },
      }),
    ),
  )
}

export { createStudents }
