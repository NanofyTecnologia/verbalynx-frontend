import { prisma } from '@/config/prisma'

function findAllStudentsById(id: string) {
  return prisma.user.findMany({
    where: {
      role: 'STUDENT',
      studentClasses: {
        some: {
          id,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  })
}

export { findAllStudentsById }
