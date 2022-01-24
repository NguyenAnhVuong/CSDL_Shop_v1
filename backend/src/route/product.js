import express from 'express';
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProducts,
    updateProduct,
    deleteProduct,
    uploadMultipleImagesProduct
} = require('../controller/product.controller');
const upload = require('../middleware/uploadProduct.middleware');
const verifyAdmin = require('../middleware/verifyAdmin');
const verifyToken = require('../middleware/verifyToken');


router.route('/')
    .get(getAllProducts)
    // .post(verifyToken,verifyAdmin,upload.array("multiple",5),createProducts);
    .post(verifyToken, verifyAdmin, createProducts);

router.route('/:id')
    .get(getProductById)
    .put(verifyToken, verifyAdmin, updateProduct)
    .delete(verifyToken, verifyAdmin, deleteProduct);

router.route('/upload-multiple').post(upload.array('images', 10), uploadMultipleImagesProduct);

module.exports = router;