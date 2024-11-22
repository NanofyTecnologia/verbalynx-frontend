import { prisma } from '@/config/prisma'

import { UpdateTaskData } from './service'

function update(id: string, data: UpdateTaskData) {
  return prisma.task.update({
    where: {
      id,
    },
    data,
  })
}

export { update }
