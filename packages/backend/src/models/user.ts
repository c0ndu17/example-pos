import { GraphQLError } from 'graphql'
import { Models } from '.'
import argon2 from '@node-rs/argon2'

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
      email: t.exposeString('email'),
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
        let password = await argon2.hash(args.password)
        return ctx.prisma.user.create({
          ...query,
          data: {
            email: args.email,
            auth: {
              create: {
                password,
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
      resolve: async (_query, _root, args, ctx) => {
        // Went this way round, because it makes it marginally more secure.
        // As opposed to including the auth in the user object.
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

        if (await argon2.verify(auth.password, args.password)) {
          return user
        }

        throw new GraphQLError('Invalid Username or Password', {
          extensions: {
            code: GraphQLErrorCode.BAD_USER_INPUT,
            http: {
              statusCode: 400,
            },
          },
        })
      },
    }),
  )
}
