const {
    createCartService,
    getCartService,
    addItemService,
    deleteItemService,
    increaseQuantityService,
    decreaseQuantityService,
    emptyCartService
} = require('../service/cart.service');

const getCart = async (req, res, next) => {
    const user_id = req.user.user_id;
    const cart = await getCartService({ user_id });
    return res.json({ cart });
}

const addItem = async (req, res, next) => {
    const cart_id = req.user.cart_id;
    const { product_id, size, quantity } = req.body;
    console.log(cart_id, product_id, quantity);
    const cart = await addItemService({ cart_id, product_id, size, quantity });
    return res.json({ cart });
}

const deleteItem = async (req, res, next) => {
    const cart_id = req.user.cart_id;
    const user_id = req.user.user_id;
    const { product_id, size } = req.body;
    console.log(">>>: ", { cart_id, product_id, size, user_id });
    const cart = await deleteItemService({ cart_id, product_id, size, user_id });
    return res.json({ cart });
}

const increaseItemQuantity = async (req, res, next) => {
    const cart_id = req.user.cart_id;
    const { product_id, size } = req.body;

    const cart = await increaseQuantityService({ cart_id, product_id, size });
    return res.json({ cart });
}

const decreaseItemQuantity = async (req, res, next) => {
    const cart_id = req.user.cart_id;
    const { product_id, size } = req.body;
    const cart = await decreaseQuantityService({ cart_id, product_id, size });
    return res.json({ cart });
}



module.exports = {
    getCart,
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity
}