import { prisma } from '@/config/prisma'

import { CreateVideoData } from './service'

function findAll() {
  return prisma.videos.findMany()
}

function create(data: CreateVideoData) {
  return prisma.videos.create({
    data,
  })
}

export { findAll, create }
