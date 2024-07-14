import { Models } from './'

/**
 * MenuItem
 */
export default (models: Models) => {
  models.prismaObject('MenuItem', {
    fields: (t) => ({
      id: t.exposeInt('id'),
      name: t.exposeString('name'),
      price: t.exposeFloat('price'),
      bills: t.relation('bills'),
    }),
  })

  // Queries for MenuItem
  models.queryField('menuItem', (t) =>
    t.prismaField({
      type: 'MenuItem',
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: (query, _root, args, context) =>
        context.prisma.menuItem.findUnique({
          ...query,
          where: { id: args.id },
        }),
    }),
  )

  models.queryField('menuItems', (t) =>
    t.prismaField({
      type: ['MenuItem'],
      resolve: (query, _root, _args, context) =>
        context.prisma.menuItem.findMany({ ...query }),
    }),
  )
}
