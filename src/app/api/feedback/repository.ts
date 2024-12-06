import { prisma } from '@/config/prisma'

export type CreateFeedbackCriterionData = {
  criterionId: string
  level: number
  score: number
  tips: string[]
  comment: string
}[]

export type CreateFeedbackData = {
  taskId: string
  classId: string
  teacherId: string
  studentId: string
} & {
  feedbacks: CreateFeedbackCriterionData
}

function create(
  data: Omit<CreateFeedbackData, 'feedbacks'>,
  feedbacks: CreateFeedbackCriterionData,
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
