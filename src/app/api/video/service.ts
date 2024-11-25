import { HttpStatusCode } from 'axios'
import { getServerSession } from 'next-auth'
import { Videos } from '@prisma/client'

import { authOptions } from '@/lib/next-auth'
import { HttpError } from '@/helpers/http-error'

import { create, findAll } from './repository'

async function getVideos() {
  return await findAll()
}

export type CreateVideoData = Omit<Videos, 'id' | 'createdAt' | 'updatedAt'>

async function createVideo(data: CreateVideoData) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || session.user.role === 'ADMIN') {
    throw new HttpError('UNAUTHORIZED', HttpStatusCode.Unauthorized)
  }

  return await create(data)
}

export { getVideos, createVideo }
