import { prisma } from '@/config/prisma'

export type CreateFeedbackCriterionData = {
  tips: string[]
  comment: string
  criterionId: string
  level: number
  score: number
}[]

export type CreateFeedbackData = {
  taskId: string
  classId: string
  teacherId: string
  studentId: string
}

function create(
  data: Omit<CreateFeedbackData, keyof CreateFeedbackCriterionData>,
  feedbackCriterionData: CreateFeedbackCriterionData,
) {
  return prisma.feedback.create({
    data: {
      ...data,
      feedbackCriterion: {
        createMany: {
          data: feedbackCriterionData,
        },
      },
    },
    select: {
      id: true,
    },
  })
}

function createStudentTask()

export { create }
