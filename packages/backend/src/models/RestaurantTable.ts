import models from '../models'

models.prismaObject('RestaurantTable', {
  fields: (t) => ({
    id: t.exposeID('id'),
    tableNo: t.exposeInt('tableNo'),
    active: t.exposeBoolean('active'),
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
    resolve: (query, _root, args, context) =>
      context.prisma.restaurantTable.findUnique({
        ...query,
        where: { id: args.id },
      }),
  }),
)

models.queryField('restaurantTables', (t) =>
  t.prismaField({
    type: ['RestaurantTable'],
    resolve: (query, _root, _args, context) =>
      context.prisma.restaurantTable.findMany({ ...query }),
  }),
)
