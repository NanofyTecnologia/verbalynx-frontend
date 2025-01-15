import { prisma } from '@/config/prisma'

import { UpdateTaskData } from './service'

function findById(id: string) {
  return prisma.task.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      feedback: true,
      openingDate: true,
      closingDate: true,
      rubric: {
        select: {
          name: true,
          criterion: true,
        },
      },
      objective: true,
      teacherId: true,
      classId: true,
      createdAt: true,
      studentTask: {
        select: {
          id: true,
          title: true,
          studentId: true,
          isCompleted: true,
          student: {
            select: {
              name: true,
              studentFeedback: {
                where: {
                  taskId: id,
                },
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      updatedAt: true,
      class: {
        select: {
          name: true,
        },
      },
    },
  })
}

function update(id: string, data: UpdateTaskData) {
  return prisma.task.update({
    where: {
      id,
    },
    data,
  })
}

function destroy(id: string) {
  return prisma.task.delete({
    where: {
      id,
    },
  })
}

export { findById, update, destroy }
