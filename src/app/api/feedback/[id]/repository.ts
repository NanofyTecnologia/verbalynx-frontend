import { FeedbackCriterion, Feedback } from '@prisma/client'

import { prisma } from '@/config/prisma'

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

export type UpdateData = Partial<Feedback>

function update(id: string, data: UpdateData) {
  return prisma.feedback.update({
    where: {
      id,
    },
    data,
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

export { findById, update, createRevaluation }
