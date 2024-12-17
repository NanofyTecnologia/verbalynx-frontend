import { prisma } from '@/config/prisma'
import { FeedbackCriterion } from '@prisma/client'

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
          rubric: {
            select: {
              criterion: {
                select: {
                  score: true,
                },
              },
            },
          },
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

export type CriterionData = Omit<
  FeedbackCriterion,
  'id' | 'createdAt' | 'updatedAt'
>

function createRevaluation(id: string, data: CriterionData) {
  return prisma.feedbackCriterion.create({
    data: {
      ...data,
      feedbackId: id,
    },
  })
}

export { findById, createRevaluation }
