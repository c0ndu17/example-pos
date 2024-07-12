import builder from '../builder'

builder.prismaObject('Auth', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    password: t.exposeString('password'),
    user: t.relation('user'),
  }),
})

// Queries for Auth
builder.queryField('login', (t) =>
  t.prismaField({
    type: 'Auth',
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: (query, _root, args, ctx) =>{
      const auth = ctx.prisma.auth.findUnique({
        ...query,
        where: { email: args.email },
      });
      return auth;
    }
  }),
)
