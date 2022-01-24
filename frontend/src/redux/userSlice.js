import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        },
        update: {
            isFetching: false,
            error: false
        },
        ordersHistory: {
            allOrdersHistory: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getAllUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getAllUsersSuccess: (state, action) => {
            state.users.allUsers = action.payload;
            state.users.isFetching = false;
            state.users.error = false;
        },
        getAllUsersFailed: state => {
            state.users.error = true;
        },
        updateUserStart: (state) => {
            state.update.isFetching = true;
        },
        updateUserSuccess: (state) => {
            state.update.isFetching = false;
        },
        updateUserFailed: (state) => {
            state.update.error = true;
        },
        getAllOrdersHistoryStart: (state) => {
            state.ordersHistory.isFetching = false;
        },
        getAllOrdersHistorySuccess: (state, action) => {
            state.ordersHistory.allOrdersHistory = action.payload;
            state.ordersHistory.isFetching = true;
        },
        getAllOrdersHistoryFailed: (state) => {
            state.ordersHistory.error = false;
        }
    }
})

export const {
    getAllUsersStart,
    getAllUsersSuccess,
    getAllUsersFailed,
    updateUserStart,
    updateUserSuccess,
    updateUserFailed,
    getAllOrdersHistoryStart,
    getAllOrdersHistorySuccess,
    getAllOrdersHistoryFailed,
} = userSlice.actions;
export default userSlice.reducer;