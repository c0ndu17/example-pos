import { DateResolver } from 'graphql-scalars'
import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '@pothos/plugin-prisma/generated'

import { prisma } from '../db'
import type { Context } from '../context'

/**
 * Models
 */
import initBill from './bill'
import initMenuItem from './menuItem'
import initBillMenuItem from './billMenuItem'
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

// TODO: Could be structured better, and reduce boilerplate. I'm not a fan of the recommended pattern, so I've been trying some things.
initBill(models)
initMenuItem(models)
initBillMenuItem(models)
initRestaurantTable(models)

models.queryType({})
models.mutationType({})

export type Models = typeof models
export default models
