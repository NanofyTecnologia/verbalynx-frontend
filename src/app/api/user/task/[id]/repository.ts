import { type StudentTask } from '@prisma/client'

import { prisma } from '@/config/prisma'

function findTasks(id: string, classId: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      studentTasks: {
        where: {
          classId,
        },
      },
    },
  })
}

function findTaskById(taskId: string, studentId: string) {
  return prisma.studentTask.findFirst({
    where: {
      taskId,
      studentId,
    },
  })
}

type CreateTaskData = Pick<StudentTask, 'title' | 'url' | 'description'>

function createTask(id: string, userId: string, data: CreateTaskData) {
  return prisma.studentTask.create({
    data: {
      ...data,
      student: {
        connect: {
          id: userId,
        },
      },
      task: {
        connect: {
          id,
        },
      },
    },
  })
}

export { findTaskById, findTasks, createTask }
