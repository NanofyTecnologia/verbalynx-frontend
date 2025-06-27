import { prisma } from '@/config/prisma'

function findTeamById(id: string) {
  return prisma.class.findUnique({
    where: {
      id,
    },
    select: {
      tasks: {
        select: {
          id: true,
        },
      },
    },
  })
}

function createStudents(id: string, data: string[]) {
  return prisma.$transaction(
    data.map((item) =>
      prisma.class.update({
        where: {
          id,
        },
        data: {
          students: {
            connect: {
              id: item,
            },
          },
        },
      }),
    ),
  )
}

function updateStudent(id: string, taskIds: { id: string }[]) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      studentTasks: {
        connect: taskIds.map((item) => ({
          id: item.id,
        })),
      },
    },
  })
}

function deleteStudent(id: string, userId: string) {
  return prisma.class.update({
    where: {
      id,
    },
    data: {
      students: {
        disconnect: {
          id: userId,
        },
      },
    },
  })
}

export { findTeamById, createStudents, updateStudent, deleteStudent }
