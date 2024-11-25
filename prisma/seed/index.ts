import pkg from '@prisma/client'
import { faker } from '@faker-js/faker'

const { PrismaClient } = pkg
const prisma = new PrismaClient()

const main = async () => {}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('Seed finished')
    await prisma.$disconnect()
  })
