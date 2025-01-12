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

type FindFeedbackByIdsParams = {
  userId: string
  teamId: string
  taskId: string
}

function findFeedbackByIds({
  userId,
  teamId,
  taskId,
}: FindFeedbackByIdsParams) {
  return prisma.feedback.findFirst({
    where: {
      taskId,
      classId: teamId,
      studentId: userId,
    },
  })
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

export { findFeedbackByIds, create }
