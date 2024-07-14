import { Models } from '.'

/**
 * RestaurantTable
 */
export default (models: Models) => {
  models.prismaObject('RestaurantTable', {
    fields: (t) => ({
      id: t.exposeID('id'),
      tableNo: t.exposeInt('tableNo'),
      active: t.boolean({
        resolve: async (query, args, ctx) =>
          !!(await ctx.prisma.restaurantTable.findFirst({
            where: {
              id: query.id,
              bills: { none: { closedAt: null } },
            },
          })),
      }),
      bills: t.relation('bills'),
    }),
  })

  // Queries for RestaurantTable
  models.queryField('restauratTable', (t) =>
    t.prismaField({
      type: 'RestaurantTable',
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, _root, args, ctx) =>
        ctx.prisma.restaurantTable.findUnique({
          ...query,
          where: { id: args.id },
        }),
    }),
  )

  models.queryField('restaurantTables', (t) =>
    t.prismaField({
      type: ['RestaurantTable'],
      resolve: (query, _root, _args, ctx) =>
        ctx.prisma.restaurantTable.findMany({ ...query }),
    }),
  )
}
