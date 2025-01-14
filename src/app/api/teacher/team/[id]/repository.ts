import { prisma } from '@/config/prisma'

function create(id: string, data: string[]) {
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
