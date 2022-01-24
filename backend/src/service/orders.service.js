const {
    createOrdersDb,
    getAllOrderDb,
    getAllOrdersByUserIdDb,
    getAllProductsOrdersDb,
    orderStatusUpdateDb,
    cancelAnOrderDb
} = require('../db/orders.db');
const {ErrorHandler} = require('../helpers/errors');

const createOrderService = async (data) => {
    try {
      return await createOrdersDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  const getAllOrderService = async()=>{
    try {
      return await getAllOrderDb();
    } catch (error) {
      throw new ErrorHandler(error.statusCode,error.message);
    }
  }

  const getAllOrdersByUserIdService = async (user_id) => {
    try {
      return await getAllOrdersByUserIdDb(user_id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  const getAllProductsOrdersService = async (data) => {
    try {
      const order = await getAllProductsOrdersDb(data);
      if (!order) {
        throw new ErrorHandler(404, "Order does not exist");
      }
      return order;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };


  const orderStatusUpdateService = async(data)=>{
    try {
      return await orderStatusUpdateDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode,error.message);
    }
  }

  const  cancelAnOrderService = async(data)=>{
    try {
      return await  cancelAnOrderDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode,error.message);
    }
  }

  

module.exports = {
    createOrderService,
    getAllOrderService,
    getAllOrdersByUserIdService,
    getAllProductsOrdersService,
    orderStatusUpdateService,
    cancelAnOrderService
  
}