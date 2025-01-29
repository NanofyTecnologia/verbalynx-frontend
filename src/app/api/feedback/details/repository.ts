import { prisma } from '@/config/prisma'

function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  })
}

function findTaskById(id: string) {
  return prisma.task.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
    },
  })
}

function findTeamById(id: string) {
  return prisma.class.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
    },
  })
}

export { findUserById, findTeamById, findTaskById }
