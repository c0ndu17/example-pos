import { Models } from '..'

import queries from './queries'
import mutations from './mutations'

/**
 * Bill
 */
export default (models: Models) => {
  models.prismaObject('Bill', {
    fields: (t) => ({
      id: t.exposeID('id'),
      createdAt: t.expose('createdAt', {
        type: 'Date',
      }),
      updatedAt: t.expose('updatedAt', {
        type: 'Date',
      }),
      restaurantTable: t.relation('restaurantTable'),
      restaurantTableId: t.exposeID('restaurantTableId'),
      user: t.relation('user'),
      items: t.relation('items'),
    }),
  })

  queries(models)
  mutations(models)
}
