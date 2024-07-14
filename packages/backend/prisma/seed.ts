/**
 * Seed the database
 */
import { PrismaClient } from '@prisma/client'
import argon2 from '@node-rs/argon2'

const prisma = new PrismaClient()

const seedUser = async () => {
  let email = 'user@example.com'
  let password = await argon2.hash('Test1234!')
  return createOrFind(
    () =>
      prisma.user.create({
        data: {
          email,
          auth: {
            create: {
              password,
            },
          },
        },
      }),
    () => {
      console.log('User already exists')
      return prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      })
    },
  )
}

const seedRestaurantTables = async (): Promise<number> => {
  let expectedRowCount = 5

  // Check if restaurant tables already seeded
  const numRestaurantTables = await prisma.restaurantTable.count()
  if (numRestaurantTables !== 0) {
    console.error(
      'Existing Data in RestuateTable: found %d tables',
      numRestaurantTables,
    )
    return numRestaurantTables
  }

  try {
    // Create an array of table objects
    const restaurantTables = [...Array(expectedRowCount)].map((_, index) => ({
      tableNo: index + 1,
    }))

    // Create the tables in the DB.
    await prisma.restaurantTable.createMany({ data: restaurantTables })
  } catch (error) {
    console.error('Failed to create tables:', error)
  }
  return await prisma.restaurantTable.count()
}

const seedMenuItems = async () => {
  /**
   * List of 10 items with prices
   */
  const menu = [
    { name: 'Pizza', price: 10.0 },
    { name: 'Burger', price: 5.0 },
    { name: 'Pasta', price: 8.0 },
    { name: 'Salad', price: 4.0 },
    { name: 'Fries', price: 3.0 },
    { name: 'Soda', price: 2.0 },
    { name: 'Beer', price: 6.0 },
    { name: 'Wine', price: 8.0 },
    { name: 'Water', price: 1.0 },
    { name: 'Coffee', price: 2.0 },
  ]

  const menuItems = await prisma.menuItem.createMany({
    data: menu,
  })

  return menuItems
}

const createOrFind = async <T>(
  create: () => Promise<T>,
  find: () => Promise<T>,
): Promise<T> => {
  try {
    return create()
  } catch (error) {
    console.error('Failed to create:', error)
  }
  return find()
}

async function seed() {
  if (process.env.NODE_ENV === 'production') {
    console.error('⚠️  Do not run seeds in production!')
    process.exit(1)
  }

  let user = await seedUser()
  let resTableCount = await seedRestaurantTables()
  let menuItems = await seedMenuItems()

  console.log(user, resTableCount, menuItems)
}

await seed()
