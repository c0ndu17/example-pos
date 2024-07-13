import models from './'

models.prismaObject('Bill', {
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
    }),
    restaurantTable: t.relation('restaurantTable'),
    restaurantTableId: t.exposeID('restaurantTableId'),
    user: t.relation('user'),
    items: t.relation('items'),
  }),
})

// Queries for Bill
models.queryField('bill', (t) =>
  t.prismaField({
    type: 'Bill',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: (query, _root, args, context) =>
      context.prisma.bill.findUnique({
        ...query,
        where: { id: args.id },
      }),
  }),
)

models.queryField('bills', (t) =>
  t.prismaField({
    type: ['Bill'],
    resolve: (query, _root, _args, context) =>
      context.prisma.bill.findMany({ ...query }),
  }),
)
