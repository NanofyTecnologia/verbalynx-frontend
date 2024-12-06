import { prisma } from '@/config/prisma'

export type CreateFeedbackCriterionData = {
  feedbacks: {
    tips: string[]
    comment: string
    criterionId: string
    level: number
    score: number
    criterion: []
  }[]
}

export type CreateFeedbackData = {
  taskId: string
  classId: string
  teacherId: string
  studentId: string
} & CreateFeedbackCriterionData

function create(
  data: Omit<CreateFeedbackData, 'feedbacks'>,
  { feedbacks }: CreateFeedbackCriterionData,
) {
  return prisma.feedback.create({
    data: {
      ...data,
      feedbackCriterion: {
        createMany: {
          data: feedbacks,
        },
      },
    },
    select: {
      id: true,
    },
  })
}

export { create }
