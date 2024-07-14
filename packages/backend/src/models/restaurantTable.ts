import { Models } from '.'

/**
 * RestaurantTable
 */
export default (models: Models) => {
  models.prismaObject('RestaurantTable', {
    fields: (t) => ({
      id: t.exposeInt('id'),
      tableNo: t.exposeInt('tableNo'),
      bill: t.prismaField({
        type: 'Bill',
        resolve: async (query, root, _args, ctx) => {
          const bill = await ctx.prisma.bill.findFirst({
            ...query,
            where: {
              closedAt: null,
              restaurantTableId: root.id,
            },
          })
          return bill
        },
      }),
    }),
  })

  // Queries for RestaurantTable
  models.queryField('restaurantTable', (t) =>
    t.prismaField({
      type: 'RestaurantTable',
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, _root, args, ctx) => {
        const table = ctx.prisma.restaurantTable.findUnique({
          ...query,
          where: { id: args.id },
        })
        return table
      },
    }),
  )

  models.queryField('restaurantTables', (t) =>
    t.prismaField({
      type: ['RestaurantTable'],
      resolve: (query, _root, _args, ctx) => {
        const tables = ctx.prisma.restaurantTable.findMany({
          ...query,
        })
        return tables
      },
    }),
  )
}
