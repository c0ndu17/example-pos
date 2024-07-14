import { Models } from '..'

/**
 * Bill Queries
 */
export default (models: Models) => {
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
}
