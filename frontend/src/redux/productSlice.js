import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: {
            allProducts: null,
            isFetching: false,
            error: false
        },
        create: {
            isFetching: false,
            error: false
        },
        update: {
            isFetching: false,
            error: false
        },
        delete: {
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getProductsStart: (state) => {
            state.products.isFetching = true;
        },
        getProductsSuccess: (state, action) => {
            state.products.isFetching = false;
            state.products.allProducts = action.payload;
        },
        getProductsFailed: (state) => {
            state.products.isFetching = false;
            state.products.error = true;
        },
        createProductStart: (state) => {
            state.create.isFetching = true;
        },
        createProductSuccess: (state) => {
            state.create.isFetching = false;
        },
        createProductFailed: (state) => {
            state.create.isFetching = false;
            state.create.error = true;
        },
        deleteProductStart: (state) => {
            state.create.isFetching = true;
        },
        deleteProductSuccess: (state) => {
            state.create.isFetching = false;
        },
        deleteProductFailed: (state) => {
            state.create.isFetching = false;
            state.create.error = true;
        },
        updateProductStart: (state) => {
            state.update.isFetching = true;
        },
        updateProductSuccess: (state) => {
            state.update.isFetching = false;
        },
        updateProductFailed: (state) => {
            state.update.isFetching = false;
            state.update.error = true;
        }
    }
});

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailed,
    createProductStart,
    createProductSuccess,
    createProductFailed,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailed,
    updateProductStart,
    updateProductSuccess,
    updateProductFailed
} = productSlice.actions;
export default productSlice.reducer;