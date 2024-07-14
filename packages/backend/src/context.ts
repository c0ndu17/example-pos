import { BaseContext, ContextFunction } from '@apollo/server'
import { prisma } from './db'
import { ExpressContextFunctionArgument } from '@apollo/server/express4'

export type Context = BaseContext & {
  userId: number
  prisma: typeof prisma
}

export const getContext: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async (ctx) => {
  // TODO: Add Auth
  const userId = 1
  return {
    ...ctx,
    userId,
    prisma,
  }
}
