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

interface PothosSchema {
  Context: Context
  Scalars: {
    Date: { Input: Date; Output: Date }
  }
  PrismaTypes: PrismaTypes
}

const models = new SchemaBuilder<PothosSchema>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
})

models.addScalarType('Date', DateResolver, {})

// TODO: Refactor to simpler structure, reduce required boilerplate
initUser(models)
initBill(models)
initMenuItem(models)
initRestaurantTable(models)

models.queryType({})
models.mutationType({})

export type Models = typeof models
export default models
