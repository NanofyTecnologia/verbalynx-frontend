import { prisma } from '@/config/prisma'

function findById(id: string) {
  return prisma.class.findUnique({
    where: {
      id,
    },
  })
}

function destroy(id: string) {
  return prisma.class.delete({
    where: {
      id,
    },
  })
}

export { findById, destroy }
