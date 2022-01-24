const router = require("express").Router();
const {
    getCart,
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity
} = require('../controller/cart.controller');
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.route('/').get(getCart);

router.route('/add').post(addItem);

router.route('/delete').delete(deleteItem);

router.route('/increment').put(increaseItemQuantity);

router.route('/decrement').put(decreaseItemQuantity);

module.exports = router;