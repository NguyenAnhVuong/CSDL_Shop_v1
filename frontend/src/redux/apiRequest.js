import axios from 'axios';
import { addToCartFailed, addToCartStart, addToCartSuccess, decrementItemFailed, decrementItemStart, decrementItemSuccess, deleteItemFailed, deleteItemStart, deleteItemSuccess, getCartFailed, getCartStart, getCartSuccess, loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';
import { createOrderFailed, createOrderStart, createOrderSuccess, getAllOrdersSuccess, getAllOrdersFailed, getAllOrdersStart, updateOrderStart, updateOrderFailed, updateOrderSuccess, deleteOrderStart, deleteOrderFailed, deleteOrderSuccess } from './orderSlice';
import { createProductFailed, createProductStart, createProductSuccess, deleteProductFailed, deleteProductStart, deleteProductSuccess, getProductsFailed, getProductsStart, getProductsSuccess, updateProductFailed, updateProductStart, updateProductSuccess } from './productSlice';
import { getAllOrdersHistoryFailed, getAllOrdersHistoryStart, getAllOrdersHistorySuccess, getAllUsersFailed, getAllUsersStart, getAllUsersSuccess, updateUserFailed, updateUserStart, updateUserSuccess } from './userSlice';

const getAllProductsFromAPI = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await axios.get('/api/products');
        dispatch(getProductsSuccess(res.data.products));
    } catch (err) {
        dispatch(getProductsFailed());
    }
}

const registerUser = async (newUser, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post('/api/auth/sign-up', newUser);
        if (res && res.data && res.data.err) {
            dispatch(registerFailed());

            console.log("err: ", res.data.err)
            return res.data.err;
        } else {
            dispatch(registerSuccess());
            navigate('/login');
            return "";
        }
    } catch (err) {
        dispatch(registerFailed());
        return "gọi api xịt";
    }

}

const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('/api/auth/login', user);
        if (res && res.data && res.data.err) {
            dispatch(loginFailed());
            console.log("err: ", res.data.err)
            return res.data.err;
        } else {
            dispatch(loginSuccess(res.data));
            if (res.data.user.user_id === 1) {
                navigate('/admin/products');
            }
            else {
                navigate('/');
            }
            return "";
        }
    } catch (err) {
        dispatch(loginFailed());
        return "gọi api xịt";
    }
}

const logoutUser = async (dispatch, navigate, token, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post("/api/auth/logout", 123, {
            headers: { authorization: token }
        });
        dispatch(logOutSuccess());
        navigate("/login");
    } catch (err) {
        dispatch(logOutFailed());
    }
}

const changePassword = async (user_id, obj_newPassword, token, axiosJWT) => {
    try {
        const res = await axiosJWT.put(`/api/users/${user_id}/change-password`, obj_newPassword, {
            headers: { authorization: token }
        });
        return res.data;

    } catch (err) {
        console.log("gọi api xịt");
    }
}

const createProduct = async (product, dispatch, token, axiosJWT) => {
    dispatch(createProductStart());
    //console.log("product: ", product);
    try {
        const res = await axiosJWT.post("/api/products", product, {
            headers: { authorization: token }
        });
        //console.log("res product: ", res);
        dispatch(createProductSuccess());
    } catch (err) {
        dispatch(createProductFailed());
    }
}

const updateProduct = async (product, dispatch, token, axiosJWT) => {
    dispatch(updateProductStart());
    try {
        const res = await axiosJWT.put(`/api/products/${product.product_id}`, product, {
            headers: { authorization: token }
        })
        //console.log("res product: ", res);
        dispatch(updateProductSuccess());
    } catch (err) {
        dispatch(updateProductFailed());
    }
}

const deleteProduct = async (id, dispatch, token, axiosJWT) => {
    dispatch(deleteProductStart());
    try {
        const res = await axiosJWT.delete(`/api/products/${id}`, {
            headers: { authorization: token }
        });
        dispatch(deleteProductSuccess());
    } catch (err) {
        dispatch(deleteProductFailed());
    }
}

const getAllUserFromAPI = async (dispatch, token, axiosJWT) => {
    dispatch(getAllUsersStart());
    try {
        const res = await axiosJWT.get("/api/users", {
            headers: { authorization: token }
        })

        dispatch(getAllUsersSuccess(res.data));
    } catch (err) {
        dispatch(getAllUsersFailed());
    }
}

const getCart = async (dispatch, token, axiosJWT) => {
    dispatch(getCartStart());
    try {
        const res = await axiosJWT.get("/api/cart", {
            headers: { authorization: token }
        });
        //console.log("get cart:", res.data.cart);
        dispatch(getCartSuccess(res.data.cart));
        return res.data.cart;
    } catch (err) {
        dispatch(getCartFailed());
    }
}

const addToCart = async (product, dispatch, token, axiosJWT) => {
    dispatch(addToCartStart());
    try {
        const res = await axiosJWT.post("/api/cart/add", product, {
            headers: { authorization: token }
        })
        // console.log("res: ", res);
        dispatch(addToCartSuccess());
    } catch (err) {
        dispatch(addToCartFailed());
    }
}

const decrementItem = async (product, dispatch, token, axiosJWT) => {
    dispatch(decrementItemStart());
    try {
        const res = await axiosJWT.put("/api/cart/decrement", product,
            {
                headers: { authorization: token }
            })
        //console.log("decrement: ", res);
        dispatch(decrementItemSuccess());
    } catch (err) {
        dispatch(decrementItemFailed());

    }
}

const incrementItem = async (product, dispatch, token, axiosJWT) => {
    dispatch(decrementItemStart());
    try {
        const res = await axiosJWT.put("/api/cart/increment", product,
            {
                headers: { authorization: token }
            })
        //console.log("increment: ", res);
        dispatch(decrementItemSuccess());
    } catch (err) {
        dispatch(decrementItemFailed());

    }
}

const deleteItemInCart = async (product, dispatch, token, axiosJWT) => {
    dispatch(deleteItemStart());
    try {
        //console.log("item: ", product);
        const res = await axiosJWT.delete("/api/cart/delete", {
            headers: { authorization: token },
            data: {
                ...product
            }
        })
        //console.log("delete: ", res);
        dispatch(deleteItemSuccess());
    } catch (err) {
        dispatch(deleteItemFailed());

    }
}

const getAllOrders = async (dispatch, token, axiosJWT) => {
    dispatch(getAllOrdersStart());
    try {
        //console.log("token: ", token);
        const res = await axiosJWT.get("/api/orders/all", {
            headers: { authorization: token }
        })
        //console.log("res: ", res);
        dispatch(getAllOrdersSuccess(res.data.orders));
    } catch (err) {
        dispatch(getAllOrdersFailed());
    }
}

const getOrdersHistory = async (dispatch, token, axiosJWT) => {
    dispatch(getAllOrdersHistoryStart());
    try {
        const res = await axiosJWT.get("/api/orders/", {
            headers: { authorization: token }
        })
        dispatch(getAllOrdersHistorySuccess(res.data.orders));
    } catch (err) {
        dispatch(getAllOrdersHistoryFailed());
    }
}

const createOrder = async (newOrder, dispatch, token, axiosJWT) => {
    dispatch(createOrderStart());
    try {
        const res = await axiosJWT.post("/api/orders/create", newOrder, {
            headers: { authorization: token }
        })
        //console.log("res: ", res);
        dispatch(createOrderSuccess());
    } catch (err) {
        dispatch(createOrderFailed());
    }
}

const orderStatusUpdate = async (id, send, success, dispatch, token, axiosJWT) => {
    dispatch(updateOrderStart());
    try {
        const res = await axiosJWT.put(`/api/orders/${id}`, { send, success }, {
            headers: { authorization: token }
        });
        //console.log("res: ", res);
        dispatch(updateOrderSuccess());
    } catch (err) {
        dispatch(updateOrderFailed());
    }
}

const deleteOrder = async (order_id, dispatch, token, axiosJWT) => {
    dispatch(deleteOrderStart());
    try {
        const res = await axiosJWT.delete(`/api/orders/${order_id}`, {
            headers: { authorization: token }
        })
        console.log("res: ", res);
        dispatch(deleteOrderSuccess());
    } catch (err) {
        dispatch(deleteOrderFailed());
    }
}

const updateUser = async (newUser, dispatch, token, axiosJWT) => {
    dispatch(updateUserStart());
    try {
        const res = await axiosJWT.put(`/api/users/${newUser.user_id}`, newUser, {
            headers: { authorization: token }
        })
        //console.log("res: ", res);
        dispatch(updateUserSuccess());
        dispatch(loginSuccess({ user: newUser, token }));
    } catch (err) {
        dispatch(updateUserFailed());
    }
}



export {
    getAllProductsFromAPI,
    registerUser,
    loginUser,
    logoutUser,
    createProduct,
    deleteProduct,
    updateProduct,
    getAllUserFromAPI,
    addToCart,
    getCart,
    decrementItem,
    incrementItem,
    deleteItemInCart,
    getAllOrders,
    createOrder,
    deleteOrder,
    updateUser,
    orderStatusUpdate,
    getOrdersHistory,
    changePassword
};