import { prisma } from '@/config/prisma'

function findById(id: string) {
  return prisma.criterion.findUnique({
    where: {
      id,
    },
    select: {
      FeedbackCriterion: true,
    },
  })
}

function destroy(id: string) {
  return prisma.criterion.delete({
    where: {
      id,
    },
  })
}

export { findById, destroy }
