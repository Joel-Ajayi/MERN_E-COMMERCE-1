import {combineReducers} from 'redux'
import {usersReducer,authReducer} from './users'
import {productsList,productDetails} from './products'
import cart from './cart'
import orders from './orders'

const reducers=combineReducers({
    auth:authReducer,
    users:usersReducer,
    products:productsList,
    productDetails,
    cart,
    orders
})

export default reducers