import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: "products",
    initialState: {
        list: [],
        isLoading: true,
        lastFetch: false,
    },
    reducers: {
        productAdded: (state, action) => {
            state.list.push(action.payload)
        },
        productsReceived: (state, action) => {
            console.log('hii');
            state.list = action.payload
            state.loading = false
            state.lastFetch = Date.now()
        },
        productsRequested: (state, action) => {
            state.loading = true
        },
        productsRequestFailed: (state, action) => {
            state.loading = false
        },
        productsDeleted: (state, action) => {
            const index = state.list.findIndex(product => product._id === action.payload.id)
            state.list.splice(index, 1)
        }
    }
})

export default slice.reducer

const { productsReceived, productsRequestFailed, productAdded, productsRequested, productsDeleted } = slice.actions


// action Creator
const url = 'http://localhost:3000/api/products'

export const loadProducts = (products) => {
    return productsReceived(products)
}

export const deleteProduct = (productId) => {
    return productsDeleted(productId)
}

export const addProduct = (product) => {
    const { lastFetch } = getState().entities.products

    apiCallBegan({
        url,
        method: 'post',
        data: product,
        onSuccess: productAdded.type,
        onError: productsRequestFailed.type
    })
}

// function selector
export const getProductById = id => createSelector(
    state => state.entities.products.list,
    (products) => products.find(product => product._id === id)
)

