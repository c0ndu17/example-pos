import { GraphQLError } from 'graphql'
import { Models } from '..'

/**
 * Bill Mutations
 */
export default (models: Models) => {
  // Mutations for Bill
  // models.mutationField('createBill', (t) =>
  //   t.prismaField({
  //     type: 'Bill',
  //     args: {
  //       restaurantTableId: t.arg.int({ required: true }),
  //       userId: t.arg.int({ required: true }),
  //     },
  //     resolve: (query, _root, args, ctx) => {
  //       const { restaurantTableId } = args
  //       return ctx.prisma.$transaction(async (prisma) => {
  //         const existingOpenBill = await prisma.bill.findFirst({
  //           where: {
  //             restaurantTableId: restaurantTableId,
  //             closedAt: null,
  //           },
  //         })
  //         if (existingOpenBill) {
  //           throw new GraphQLError(
  //             'Bill already exists for this table. Please close the existing bill first.',
  //             {
  //               extensions: {
  //                 code: 'BAD_USER_INPUT',
  //                 http: {
  //                   statusCode: 409,
  //                 },
  //               },
  //             },
  //           )
  //         }
  //         return prisma.bill.create({
  //           ...query,
  //           data: {
  //             restaurantTable: {
  //               connect: { id: args.restaurantTableId },
  //             },
  //             user: {
  //               connect: { id: args.userId },
  //             },
  //           },
  //         })
  //       })
  //     },
  //   }),
  // )
  // models.mutationField('addItemToBill', (t) =>
  //   t.prismaField({
  //     type: 'Bill',
  //     args: {
  //       id: t.arg.int({ required: true }),
  //       restaurantTableId: t.arg.int(),
  //     },
  //     resolve: (query, _root, args, ctx) =>
  //       ctx.prisma.bill.update({
  //         ...query,
  //         where: { id: args.id },
  //         data: {
  //           restaurantTable: {
  //             // connect: { id: args.restaurantTableId },
  //           },
  //           user: {
  //             connect: { id: ctx.userId },
  //           },
  //         },
  //       }),
  //   }),
  // )
  // // Finalize a bill (checkout)
  // models.mutationField('closeBill', (t) =>
  //   t.prismaField({
  //     type: 'Bill',
  //     args: {
  //       id: t.arg.int({ required: true }),
  //     },
  //     resolve: (query, _root, args, ctx) =>
  //       ctx.prisma.bill.update({
  //         ...query,
  //         where: { id: args.id },
  //         data: {
  //           closedAt: new Date(),
  //         },
  //       }),
  //   }),
  // )
}
