const router = require("express").Router();

const {
    createOrder,
    getAllOrder,
    getAllOrdersByUserId,
    getAllProductsOrders,
    orderIsSent,
    orderStatusUpdate,
    cancelAnOrder
} = require('../controller/orders.controller');

const verifyAdmin = require('../middleware/verifyAdmin');
const verifyToken = require('../middleware/verifyToken');


router.route('/').get(verifyToken, getAllOrdersByUserId);
router.route('/all').get(verifyToken,verifyAdmin, getAllOrder);
router.route('/create').post(verifyToken, createOrder);
router.route('/:id')
.put(verifyToken,verifyAdmin,orderStatusUpdate)
.get(verifyToken, getAllProductsOrders)
.delete(verifyToken,verifyAdmin,cancelAnOrder);



module.exports = router;
