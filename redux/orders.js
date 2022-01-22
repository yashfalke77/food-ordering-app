import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: "orders",
    initialState: {
        list: [],
        isLoading: true,
        lastFetch: false,
    },
    reducers: {
        orderAdded: (state, action) => {
            state.list.push(action.payload)
        },
        ordersReceived: (state, action) => {
            state.list = action.payload
            state.loading = false
            state.lastFetch = Date.now()
        },
        ordersRequested: (state, action) => {
            state.loading = true
        },
        ordersRequestFailed: (state, action) => {
            state.loading = false
        },
        ordersStatusChanged: (orders, action) => {
            const index = orders.list.findIndex(order => order._id === action.payload.id)
            const currentStatus = orders.list[index].status
            orders.list[index].status = currentStatus + 1
            console.log( orders.list[index].status)
        }
    }
})

export default slice.reducer

const { orderAdded, ordersReceived, ordersRequestFailed, ordersRequested, ordersStatusChanged } = slice.actions


// action Creator
const url = 'http://localhost:3000/api/orders'

export const loadorders = (orders) => {
    return ordersReceived(orders)
}

export const changeStatus = (id) => {
    return ordersStatusChanged(id)
}

export const addOrder = (order) => {
    return apiCallBegan({
        url,
        method: 'post',
        data: order,
        onSuccess: orderAdded.type,
        onError: ordersRequestFailed.type
    })
}

// function selector
export const getOrderByName = (name) => createSelector(
    state => state.entities.orders,
    (products) => orders.find(order => order.name === name)
)

