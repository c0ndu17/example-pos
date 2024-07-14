import { GraphQLError } from 'graphql'
import { Models } from '..'

/**
 * Bill Mutations
 */
export default (models: Models) => {
  // Mutations for Bill
  models.mutationField('openBill', (t) =>
    t.prismaField({
      type: 'Bill',
      args: {
        restaurantTableId: t.arg.int({ required: true }),
      },
      resolve: (query, _root, args, ctx) => {
        const { restaurantTableId } = args
        return ctx.prisma.$transaction(async (prisma) => {
          const existingOpenBill = await prisma.bill.findFirst({
            where: {
              restaurantTableId: restaurantTableId,
              closedAt: null,
            },
          })

          if (existingOpenBill) {
            throw new GraphQLError(
              'Bill already exists for this table. Please close the existing bill first.',
              {
                extensions: {
                  code: 'CONFLICT',
                  http: {
                    statusCode: 409,
                  },
                },
              },
            )
          }

          return prisma.bill.create({
            ...query,
            data: {
              restaurantTable: {
                connect: { id: args.restaurantTableId },
              },
            },
          })
        })
      },
    }),
  )

  models.mutationField('addItemToBill', (t) =>
    t.prismaField({
      type: 'Bill',
      args: {
        id: t.arg.int({ required: true }),
        menuItemId: t.arg.int({ required: true }),
      },
      resolve: async (_query, _root, { id, menuItemId }, ctx) => {
        const billMenuItem = await ctx.prisma.billMenuItem.create({
          data: {
            bill: { connect: { id } },
            menuItem: { connect: { id: menuItemId } },
          },
          include: {
            bill: true,
          },
        })
        return billMenuItem.bill
      },
    }),
  )

  models.mutationField('removeItemFromBill', (t) =>
    t.prismaField({
      type: 'Bill',
      args: {
        id: t.arg.int({ required: true }),
        menuItemId: t.arg.int({ required: true }),
      },
      resolve: async (_query, _root, { id, menuItemId }, ctx) => {
        const billMenuItem = await ctx.prisma.billMenuItem.findFirst({
          where: { billId: id, menuItemId },
        })
        await ctx.prisma.billMenuItem.delete({
          where: { id: billMenuItem?.id },
        })
        return ctx.prisma.bill.findFirst({ where: { id } })
      },
    }),
  )

  models.mutationField('closeBill', (t) =>
    t.prismaField({
      type: 'Bill',
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, _root, args, ctx) =>
        ctx.prisma.bill.update({
          ...query,
          where: { id: args.id },
          data: {
            closedAt: new Date(),
          },
        }),
    }),
  )
}
