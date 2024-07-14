import { Models } from '.'

/**
 * Bill
 */
export default (models: Models) => {
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

  // Mutations for Bill
  models.mutationField('createBill', (t) =>
    t.prismaField({
      type: 'Bill',
      args: {
        restaurantTableId: t.arg.int({ required: true }),
        userId: t.arg.int({ required: true }),
      },
      resolve: (query, _root, args, context) =>
        context.prisma.bill.create({
          ...query,
          data: {
            restaurantTable: {
              connect: { id: args.restaurantTableId },
            },
            user: {
              connect: { id: args.userId },
            },
          },
        }),
    }),
  )

  models.mutationField('deleteBill', (t) =>
    t.prismaField({
      type: 'Bill',
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, _root, args, context) =>
        context.prisma.bill.delete({
          ...query,
          where: { id: args.id },
        }),
    }),
  )

  models.mutationField('addItem', (t) =>
    t.prismaField({
      type: 'Bill',
      args: {
        id: t.arg.int({ required: true }),
        restaurantTableId: t.arg.int(),
      },
      resolve: (query, _root, args, context) =>
        context.prisma.bill.update({
          ...query,
          where: { id: args.id },
          data: {
            restaurantTable: {
              // connect: { id: args.restaurantTableId },
            },
            user: {
              connect: { id: ctx.userId },
            },
          },
        }),
    }),
  )

  // Finalize a bill (checkout)
  models.mutationField('closeBill', (t) =>
    t.prismaField({
      type: 'Bill',
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, _root, args, context) =>
        context.prisma.bill.update({
          ...query,
          where: { id: args.id },
          data: {
            closedAt: new Date(),
          },
        }),
    }),
  )
}
