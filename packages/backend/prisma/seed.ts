/**
 * Seeds the database with ...
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  // Seed your database here
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      auth: {
        create: {
          password: 'password',
        },
      },
    },
  })
  console.log(user)
}

await seed()
