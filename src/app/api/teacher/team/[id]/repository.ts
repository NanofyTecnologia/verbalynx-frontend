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

function deleteStudent(id: string, userId: string) {
  return prisma.class.update({
    where: {
      id,
    },
    data: {
      students: {
        disconnect: {
          id: userId,
        },
      },
    },
  })
}

export { createStudents, deleteStudent }
