const {
    createOrderService,
    getAllOrderService,
    getAllOrdersByUserIdService,
    getAllProductsOrdersService,
    orderStatusUpdateService,
    cancelAnOrderService
} = require('../service/orders.service');
const { emptyCartDb } = require('../db/cart.db');


const createOrder = async (req, res, next) => {
    const cart_id = req.user.cart_id;
    const user_id = req.user.user_id;
    const { user_name, email, address, phone_number, note } = req.body;
    // console.log(cart_id,user_id,user_name,email,address,phone_number);
    const lastOrder = await createOrderService({ cart_id, user_id, user_name, email, address, phone_number, note });

    await emptyCartDb(cart_id);// xoa toan bo cart sau khi order

    return res.json({ lastOrder });
}

const getAllOrder = async (req, res, next) => {
    const orders = await getAllOrderService();
    return res.json({ orders });
}

const getAllOrdersByUserId = async (req, res, next) => {
    const user_id = req.user.user_id;

    const orders = await getAllOrdersByUserIdService({ user_id });

    return res.json({ orders });
}

const getAllProductsOrders = async (req, res, next) => {
    const order_id = req.params.id;
    const user_id = req.user.user_id;

    const data = await getAllProductsOrdersService({ order_id, user_id });

    return res.json({ data });
}

const orderIsSent = async (req, res, next) => {
    const order_id = req.params.id;
    const status = await orderIsSentService({ order_id });
    return res.json({ status, message: "order is sent" });
}

const orderStatusUpdate = async (req, res, next) => {
    const order_id = req.params.id;
    const { send, success } = req.body;
    const status = await orderStatusUpdateService({ order_id, send, success });
    return res.json({ status, message: "order is updated" });
}

const  cancelAnOrder = async(req,res,next)=>{
    const user_id = req.user.user_id;
    const order_id = req.params.id;

    console.log({user_id,order_id});
    const status = await cancelAnOrderService({user_id,order_id});
    return res.json({status,message:"Đơn hàng đã được xử lý !"});

}

module.exports = {
    createOrder,
    getAllOrder,
    getAllOrdersByUserId,
    getAllProductsOrders,
    orderIsSent,
    orderStatusUpdate,
    cancelAnOrder
}