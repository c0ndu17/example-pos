import SchemaBuilder from '@pothos/core'
import { DateResolver } from 'graphql-scalars'
import { prisma } from './db'
import type { Context } from './context'

import PrismaPlugin from '@pothos/plugin-prisma'

import type PrismaTypes from '@pothos/plugin-prisma/generated'

const builder = new SchemaBuilder<{
  Context: Context,
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

builder.addScalarType('Date', DateResolver, {})

builder.queryType({})

export default builder
