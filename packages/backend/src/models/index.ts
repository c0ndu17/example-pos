import { DateResolver } from 'graphql-scalars'
import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '@pothos/plugin-prisma/generated'

import { prisma } from '../db'
import type { Context } from '../context'

/**
 * Models
 */
import initUser from './user'
import initBill from './bill'
import initMenuItem from './menuItem'
import initRestaurantTable from './restaurantTable'

const models = new SchemaBuilder<{
  Context: Context
  Scalars: {
    Date: { Input: Date; Output: Date }
  }
  PrismaTypes: PrismaTypes
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
})

models.addScalarType('Date', DateResolver, {})
models.queryType({})

// TODO: Refactor to simpler structure, reduce required boilerplate
initUser(models)
initBill(models)
initMenuItem(models)
initRestaurantTable(models)

export type Models = typeof models
export default models
