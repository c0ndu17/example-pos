import { BaseContext, ContextFunction } from '@apollo/server'
import { prisma } from './db'
import { ExpressContextFunctionArgument } from '@apollo/server/express4'

export type Context = BaseContext & {
  prisma: typeof prisma
}

export const getContext: ContextFunction<
  [ExpressContextFunctionArgument],
  Context
> = async (ctx) => {
  return {
    ...ctx,
    prisma,
  }
}
