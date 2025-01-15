import { prisma } from '@/config/prisma'

function findAll() {
  return prisma.user.findMany({
    where: {
      role: 'STUDENT',
    },
  })
}

export { findAll }
