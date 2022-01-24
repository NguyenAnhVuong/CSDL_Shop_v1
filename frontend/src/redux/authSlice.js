import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
        },
        logout: {
            isFetching: false,
            error: false
        }, test: {
            test: true,
        },
        cart: {
            cart: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
        },
        logOutStart: (state) => {
            state.logout.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.login.currentUser = null;
            state.cart.cart = null;
            state.logout.isFetching = false;
            state.logout.error = false;
        },
        logOutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
        getCartStart: (state) => {
            state.cart.isFetching = true;
        },
        getCartSuccess: (state, action) => {
            state.cart.isFetching = false;
            state.cart.cart = action.payload;
        },
        getCartFailed: (state, action) => {
            state.error = true;
        },
        addToCartStart: (state) => {
            state.cart.isFetching = true;
        },
        addToCartSuccess: (state) => {
            state.cart.isFetching = false;
        },
        addToCartFailed: (state) => {
            state.cart.error = true;
        },
        decrementItemStart: (state) => {
            state.cart.isFetching = true;
        },
        decrementItemSuccess: (state) => {
            state.cart.isFetching = false;
        },
        decrementItemFailed: (state) => {
            state.cart.error = true;
        },
        incrementItemStart: (state) => {
            state.cart.isFetching = true;
        },
        incrementItemSuccess: (state) => {
            state.cart.isFetching = false;
        },
        incrementItemFailed: (state) => {
            state.cart.error = true;
        },
        deleteItemStart: (state) => {
            state.cart.isFetching = true;
        },
        deleteItemSuccess: (state) => {
            state.cart.isFetching = false;
        },
        deleteItemFailed: (state) => {
            state.cart.error = true;
        },
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
    getCartStart,
    getCartSuccess,
    getCartFailed,
    addToCartStart,
    addToCartSuccess,
    addToCartFailed,
    decrementItemStart,
    decrementItemSuccess,
    decrementItemFailed,
    incrementItemStart,
    incrementItemSuccess,
    incrementItemFailed,
    deleteItemStart,
    deleteItemSuccess,
    deleteItemFailed,
} = authSlice.actions;
export default authSlice.reducer;