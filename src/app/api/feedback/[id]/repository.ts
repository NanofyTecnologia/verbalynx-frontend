import { prisma } from '@/config/prisma'
import { comment } from 'postcss'

function findById(id: string) {
  return prisma.feedback.findUnique({
    where: {
      id,
    },
    select: {
      student: {
        select: {
          name: true,
        },
      },
      class: {
        select: {
          name: true,
        },
      },
      task: {
        select: {
          id: true,
          name: true,
        },
      },
      feedbackCriterion: {
        select: {
          id: true,
          tips: true,
          score: true,
          level: true,
          comment: true,
        },
      },
    },
  })
}

export { findById }
