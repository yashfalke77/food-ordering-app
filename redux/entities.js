import { combineReducers } from "redux";
import cartReducer from './carts'
import productReducer from './products'
import orderReducer from './orders'

export default combineReducers({
    carts: cartReducer,
    products: productReducer,
    orders: orderReducer,
})