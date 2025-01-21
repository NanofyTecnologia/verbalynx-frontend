import { prisma } from '@/config/prisma'

export type GetAllStudentsParams = {
  teamId: string | null
}

function findAll(params?: GetAllStudentsParams) {
  return prisma.user.findMany({
    where: {
      role: 'STUDENT',
      ...(params?.teamId && {
        studentClasses: {
          none: {
            id: params.teamId,
          },
        },
      }),
    },
  })
}

export { findAll }
