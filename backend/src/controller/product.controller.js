const { json } = require('body-parser');
const {
    getAllProductService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService
} = require('../service/product.service');

const getAllProducts = async (req, res, next) => {
    const products = await getAllProductService();
    return res.json({ products });
}

const getProductById = async (req, res, next) => {

    const product = await getProductByIdService(req.params);
    return res.json({ product: product });
}


const createProducts = async (req, res, next) => {
    const { product_name, product_type, product_avatar, new_product, quantity, price, discount, bought_count, image_array } = req.body;
    // console.log(product_name,product_type,avatar,new_product,quantity,price,discount,bought_count,image_array);
    try {
        const product = await createProductService({ product_name, product_type, product_avatar, new_product, quantity, price, discount, bought_count, image_array });
        return res.status(200).json({ product, message: "Thêm thành công !" });

    } catch (err) {
        console.log(err);
    }

    // const {product} = await createProductService({...req.body,files});

}

const updateProduct = async (req, res, next) => {
    const id = Number(req.params.id);
    const { product_name, product_type, product_avatar, new_product, quantity, price, discount, bought_count, image_array } = req.body;
    // console.log(id ,product_name,product_type,avatar,new_product,size,quantity,price,discount,bought_count,image_array);    
    const product = await updateProductService({ id, product_name, product_type, product_avatar, new_product, quantity, price, discount, bought_count, image_array });
    return res.json({ product });
}

const uploadMultipleImagesProduct = async (req, res, next) => {
    const files = req.files;
    const array = [];
    files.map(file => (array.push(file.filename)));
    return res.status(200).json(array);
}

const deleteProduct = async (req, res, next) => {
    console.log("req.params: ", req.params);
    const product = await deleteProductService(req.params);
    return res.json({ product });
}


module.exports = {
    getAllProducts,
    getProductById,
    createProducts,
    updateProduct,
    deleteProduct,
    uploadMultipleImagesProduct
}