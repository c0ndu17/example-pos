import builder from './builder'

import './models/User'
import './models/Auth'
import './models/Bill'
import './models/MenuItem'
import './models/RestaurantTable'

const schema = builder.toSchema({})
export default schema
