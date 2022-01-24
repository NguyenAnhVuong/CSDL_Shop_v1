const {
    
    createCartDb,
    getCartDb,
    addItemDb,
    deleteItemDb,
    increaseItemQuantityDb,
    decreaseItemQuantityDb,
    emptyCartDb
    
} = require('../db/cart.db');

const {ErrorHandler} = require('../helpers/errors');


  const  createCartService = async (user_id) => {
    try {
      return await createCartDb(user_id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  const getCartService = async (user_id) => {
    try {
      return await getCartDb(user_id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  const addItemService = async (data) => {
    try {
      return await addItemDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  const deleteItemService = async (data) => {
    try {
      return await deleteItemDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  const increaseQuantityService = async (data) => {
    try {
      return await increaseItemQuantityDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  const decreaseQuantityService = async (data) => {
    try {
      return await decreaseItemQuantityDb(data);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  const emptyCartService = async (cart_id) => {
    try {
      return await emptyCartDb(cart_id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  module.exports = {
      createCartService,
      getCartService,
      addItemService,
      deleteItemService,
      increaseQuantityService,
      decreaseQuantityService,
      emptyCartService
  }