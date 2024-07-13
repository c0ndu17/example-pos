// Not sure how I feel about the below syntax, but there's not going to be a better opportunity.
import models from './'

models.prismaObject('Auth', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    password: t.exposeString('password'),
    user: t.relation('user'),
  }),
})

// Queries for Auth
models.queryField('register', (t) =>
  t.prismaField({
    type: 'Auth',
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: (query, _root, args, ctx) => {
      const auth = ctx.prisma.auth.findUnique({
        ...query,
        where: { email: args.email },
      })

      return auth
    },
  }),
)
models.queryField('login', (t) =>
  t.prismaField({
    type: 'Auth',
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: (query, _root, args, ctx) => {
      const auth = ctx.prisma.auth.findUnique({
        ...query,
        where: { email: args.email },
      })

      return auth
    },
  }),
)
