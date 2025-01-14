import { Criterion, Rubric, Task } from '@prisma/client'

import { prisma } from '@/config/prisma'
import { rubric } from '@/services/rubric'

function findById(id: string) {
  return prisma.task.findUnique({
    where: {
      id,
    },
  })
}

function update(id: string, data: Partial<Task>) {
  return prisma.task.update({
    where: {
      id,
    },
    data,
    select: {
      rubric: {
        select: {
          id: true,
        },
      },
    },
  })
}

function updateRubric(id: string, data: Partial<Rubric>) {
  return prisma.rubric.update({
    where: {
      id,
    },
    data,
  })
}

function upsertCriterion(id: string, data: Partial<Criterion>[]) {
  return prisma.$transaction(
    data.map((item) =>
      prisma.rubric.update({
        where: {
          id,
        },
        data: {
          criterion: {
            upsert: {
              where: {
                id: item.id ?? '',
              },
              create: {
                ...item,
              },
              update: {
                ...item,
              },
            },
          },
        },
      }),
    ),
  )
}

export { findById, update, updateRubric, upsertCriterion }
