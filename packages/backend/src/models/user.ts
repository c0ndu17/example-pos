import { GraphQLError } from 'graphql'
import { Models } from '.'

/**
 * User
 */
export default (models: Models) => {
  models.prismaObject('User', {
    fields: (t) => ({
      id: t.exposeID('id'),
      createdAt: t.expose('createdAt', {
        type: 'Date',
      }),
      updatedAt: t.expose('updatedAt', {
        type: 'Date',
      }),
      authId: t.exposeID('authId'),
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

  models.mutationField('createUser', (t) =>
    t.prismaField({
      type: 'User',
      args: {
        email: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
      },
      resolve: async (query, _root, args, ctx) => {
        return ctx.prisma.user.create({
          ...query,
          data: {
            email: args.email,
            auth: {
              create: {
                password: args.password,
              },
            },
          },
        })
      },
    }),
  )

  models.mutationField('loginUser', (t) =>
    t.prismaField({
      type: 'User',
      args: {
        email: t.arg.string({ required: true }),
        password: t.arg.string({ required: true }),
      },
      resolve: async (query, _root, args, ctx) => {
        let { user, ...auth } = await ctx.prisma.auth.findFirstOrThrow({
          where: {
            user: {
              email: args.email,
            },
          },
          include: {
            user: true,
          },
        })
        if (auth.password !== args.password) {
          throw new GraphQLError('Invalid Username or Password', {
            extensions: {
              code: GraphQLErrorCode.BAD_USER_INPUT,
              http: {
                statusCode: 400,
              },
            },
          })
        }

        return user
      },
    }),
  )
}
