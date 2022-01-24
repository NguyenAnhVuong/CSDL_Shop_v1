const {
  getAllProductsDb,
  createProductDb,
  getProductById,
  updateProductDb,
  deleteProductDb
} = require("../db/product.db");
const { ErrorHandler } = require("../helpers/errors");


const getAllProductService = async () => {

  try {
    return await getAllProductsDb();
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

const getProductByIdService = async (id) => {
  try {
    return await getProductById(id);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
}


const createProductService = async (data) => {
  try {
    return await createProductDb(data);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
}

const updateProductService = async (data) => {
  try {
    return await updateProductDb(data);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
}

const deleteProductService = async (id) => {
  try {
    return await deleteProductDb(id);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
}
module.exports = {
  getAllProductService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService
}
