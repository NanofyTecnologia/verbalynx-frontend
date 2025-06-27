import { prisma } from '@/config/prisma'
import { Role } from '@prisma/client'

export type GetAllStudentsParams = {
  role: Role
  teamId: string | null
}

function findAll(params?: GetAllStudentsParams) {
  return prisma.user.findMany({
    where: {
      ...(params?.teamId && {
        studentClasses: {
          none: {
            id: params.teamId,
          },
        },
      }),
      role: params?.role ? params.role : undefined
    },
  })
}

export { findAll }
