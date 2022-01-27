import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: "cart",
    initialState: {
        products: [],
        total: 0,
        orderQuantity: 0
    },
    reducers: {
        productAdded: (state, action) => {
            state.orderQuantity +=1
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
        }, 
        productReseted: (state, action) => {
            state.products = []
            state.total = 0
            state.orderQuantity = 0
        }
    }
})

export const {productAdded, productReseted} = cart.actions

export default cart.reducer