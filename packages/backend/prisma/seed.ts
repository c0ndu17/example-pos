/**
 * Seed the database
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * RestaurantTables
 */
const seedRestaurantTables = async (): Promise<number> => {
  let expectedRowCount = 5

  // Check if restaurant tables already seeded
  const numRestaurantTables = await prisma.restaurantTable.count()
  if (numRestaurantTables !== 0) {
    console.error(
      'Existing Data in RestaurantTables: found %d restaurant tables',
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

/**
 * MenuItems
 * Adds 10 items with prices
 */
const seedMenuItems = async () => {
  const menu = [
    { name: 'Pizza', price: 13.75 },
    { name: 'Burger', price: 8.99 },
    { name: 'Pasta', price: 12 },
    { name: 'Salad', price: 6 },
    { name: 'Fries', price: 2.5 },
    { name: 'Soda', price: 1.95 },
    { name: 'Beer', price: 5 },
    { name: 'Wine', price: 8 },
    { name: 'Water', price: 0.5 },
    { name: 'Coffee', price: 2.5 },
  ]

  const menuItems = await prisma.menuItem.createMany({
    data: menu,
  })

  return menuItems
}

/**
 * Note: This doesn't prevent duplicate seeding.
 */
async function seed() {
  if (process.env.NODE_ENV === 'production') {
    console.error('⚠️  Do not run seeds in production!')
    process.exit(1)
  }

  await seedRestaurantTables()
  await seedMenuItems()
}

await seed()
