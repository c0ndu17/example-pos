import models from './models'

/**
 * Import models
 *
 */
import './models/User'
import './models/Auth'
import './models/Bill'
import './models/MenuItem'
import './models/RestaurantTable'

const schema = models.toSchema({})

export default schema
