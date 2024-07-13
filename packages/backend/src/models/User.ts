import models from './'

models.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
    }),
    auth: t.relation('auth'),
    bills: t.relation('bills'),
  }),
})

models.queryField('user', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: (query, _root, args, ctx) =>
      ctx.prisma.user.findUnique({
        ...query,
        where: { id: args.id },
      }),
  }),
)

models.queryField('users', (t) =>
  t.prismaField({
    type: ['User'],
    resolve: async (query, _root, _args, ctx) => {
      return ctx.prisma.user.findMany({ ...query })
    },
  }),
)
