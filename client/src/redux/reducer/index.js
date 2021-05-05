import {combineReducers} from 'redux'
import {usersReducer,authReducer} from './users'
import {productReducer} from './products'
import cart from './cart'
import orders from './orders'

const reducers=combineReducers({
    auth:authReducer,
    users:usersReducer,
    products:productReducer,
    cart,
    orders
})

export default reducers