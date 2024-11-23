import { prisma } from '@/config/prisma'

import { CreateTaskData } from './service'

function create(data: CreateTaskData) {
  return prisma.task.create({
    data,
  })
}

function findAllStudentsByClassId(id: string) {
  return prisma.class.findUnique({
    where: {
      id,
    },
    select: {
      students: true,
    },
  })
}

function createStudentTasks(id: string, taskId: string) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      studentTasks: {
        connect: {
          id: taskId,
        },
      },
    },
  })
}

function findByTeacher(id: string) {
  return prisma.task.findMany({
    where: {
      teacherId: id,
    },
  })
}

function findByStudent(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      studentTasks: true,
    },
  })
}

export {
  create,
  findAllStudentsByClassId,
  findByTeacher,
  findByStudent,
  createStudentTasks,
}
