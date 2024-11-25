import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { Evaluation, Rubric, Task } from '@prisma/client'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import {
  create,
  createStudentTasks,
  findAllStudentsByClassId,
  findByStudent,
  findByTeacher,
} from './repository'

export type CreateTaskData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'> & {
  rubric: Rubric & {
    evaluation: Evaluation[]
  }
}

async function createTask(data: CreateTaskData) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role !== 'PROFESSOR' || !data.classId) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  const team = await findAllStudentsByClassId(data.classId)

  const createdTask = await create({ ...data, teacherId: session.user.id })

  team?.students.forEach(async (item) => {
    return await createStudentTasks(item.id, createdTask.id)
  })

  if (!createdTask) {
    throw new HttpError(
      'INTERNAL_SERVER_ERROR',
      HttpStatusCode.InternalServerError,
    )
  }

  return createdTask
}

async function getTaskByUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  if (session.user.role === 'PROFESSOR') {
    return await findByTeacher(session.user.id)
  } else {
    const user = await findByStudent(session.user.id)

    return user?.studentTasks
  }
}

export { getTaskByUser }

export { createTask }
