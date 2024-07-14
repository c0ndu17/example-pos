import { Models } from './'

/**
 * BillMenuItem
 */
export default (models: Models) => {
  models.prismaObject('BillMenuItem', {
    fields: (t) => ({
      id: t.exposeInt('id'),
      bill: t.relation('bill'),
      billId: t.exposeInt('billId'),
      menuItem: t.relation('menuItem'),
      menuItemId: t.exposeInt('menuItemId'),
    }),
  })

  // Queries for BillMenuItem
  models.queryField('billMenuItem', (t) =>
    t.prismaField({
      type: 'BillMenuItem',
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, _root, args, context) =>
        context.prisma.billMenuItem.findUnique({
          ...query,
          where: { id: args.id },
        }),
    }),
  )

  models.queryField('billMenuItems', (t) =>
    t.prismaField({
      type: ['BillMenuItem'],
      resolve: (query, _root, _args, context) =>
        context.prisma.billMenuItem.findMany({ ...query }),
    }),
  )
}
