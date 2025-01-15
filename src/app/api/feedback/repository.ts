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

function findStudentTask({
  userId,
  taskId,
}: Pick<FindFeedbackByIdsParams, 'userId' | 'taskId'>) {
  return prisma.studentTask.findFirst({
    where: {
      taskId,
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

function updateIsCompleted(id: string) {
  return prisma.studentTask.update({
    where: {
      id,
    },
    data: {
      isCompleted: true,
    },
  })
}

export { findFeedbackByIds, findStudentTask, create, updateIsCompleted }
