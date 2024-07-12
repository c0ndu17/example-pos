import builder from '../builder'

builder.prismaObject('RestaurantTable', {
  fields: (t) => ({
    id: t.exposeID('id'),
    tableNo: t.exposeInt('tableNo'),
    active: t.exposeBoolean('active'),
    bills: t.relation('bills'),
  }),
})

builder.prismaObject('RestaurantTable', {
  fields: (t) => ({
    id: t.exposeID('id'),
    tableNo: t.exposeInt('tableNo'),
    active: t.exposeBoolean('active'),
    bills: t.relation('bills'),
  }),
})
builder.prismaObject("RestaurantTable", {
  fields: (t) => ({
    id: t.exposeID("id"),
    tableNo: t.exposeInt("tableNo"),
    active: t.exposeBoolean("active"),
    bills: t.relation("bills"),
  }),
});

// Queries for RestaurantTable
builder.queryField('restaurantTable', (t) => 
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
  })
);

builder.queryField('restaurantTables', (t) => 
  t.prismaField({
    type: ['RestaurantTable'],
    resolve: (query, _root, _args, context) =>
      context.prisma.restaurantTable.findMany({ ...query }),
  })
);


