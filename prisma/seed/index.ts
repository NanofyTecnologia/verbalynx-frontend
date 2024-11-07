import pkg from '@prisma/client'
import { faker } from '@faker-js/faker'

const { PrismaClient } = pkg
const prisma = new PrismaClient()

const main = async () => {
  const usersToCreate = Array.from({ length: 12 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    graduation: faker.helpers.arrayElement([
      'Ensino Médio',
      'Ensino Fundamental',
      'Ensino Superior',
      'Outro',
    ]),
    classId: 'cm359b58w0001x9bt1mqpik60',
    role: 'STUDENT',
  }))

  await prisma.user.createMany({
    data: usersToCreate,
  })
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('Seed finished')
    await prisma.$disconnect()
  })
