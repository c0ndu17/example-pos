import { Models } from '..'

import queries from './queries'
import mutations from './mutations'

/**
 * Bill
 */
export default (models: Models) => {
  models.prismaObject('Bill', {
    fields: (t) => ({
      id: t.exposeInt('id'),
      createdAt: t.expose('createdAt', {
        type: 'Date',
      }),
      updatedAt: t.expose('updatedAt', {
        type: 'Date',
      }),
      closedAt: t.expose('closedAt', {
        type: 'Date',
      }),
      restaurantTable: t.relation('restaurantTable'),
      restaurantTableId: t.exposeInt('restaurantTableId'),
      items: t.relation('items'),
    }),
  })

  queries(models)
  mutations(models)
}
