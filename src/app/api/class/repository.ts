import { prisma } from '@/config/prisma'

import { CreateClassData } from './service'

function create(data: CreateClassData) {
  return prisma.class.create({
    data,
  })
}

function getByTeacher(id: string) {
  return prisma.class.findMany({
    where: {
      teacherId: id,
    },
  })
}

function getByStudent(id: string) {
  return prisma.user.findMany({
    where: {
      id,
    },
    select: {
      studentClasses: true,
    },
  })
}

export { create, getByTeacher, getByStudent }
