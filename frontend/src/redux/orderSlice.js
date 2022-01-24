import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: {
            allOders: null,
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
        getAllOrdersStart: (state) => {
            state.orders.isFetching = true;
        },
        getAllOrdersSuccess: (state, action) => {
            state.orders.allOders = action.payload;
            state.orders.isFetching = false;
        },
        getAllOrdersFailed: (state) => {
            state.orders.error = true;
        },
        createOrderStart: (state) => {
            state.create.isFetching = true;
        },
        createOrderSuccess: (state) => {
            state.create.isFetching = false;
        },
        createOrderFailed: (state) => {
            state.create.error = true;
        },
        updateOrderStart: (state) => {
            state.update.isFetching = true;
        },
        updateOrderSuccess: (state) => {
            state.update.isFetching = false;
        },
        updateOrderFailed: (state) => {
            state.update.error = true;
        },
        deleteOrderStart: (state) => {
            state.delete.isFetching = true;
        },
        deleteOrderSuccess: (state) => {
            state.delete.isFetching = false;
        },
        deleteOrderFailed: (state) => {
            state.delete.error = true;
        }

    }
})

export const {
    getAllOrdersStart,
    getAllOrdersSuccess,
    getAllOrdersFailed,
    createOrderStart,
    createOrderSuccess,
    createOrderFailed,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailed,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailed
} = orderSlice.actions;
export default orderSlice.reducer;