const express = require('express');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router
    .route('/')
    .get(getProducts)
    .post(protect, adminProtect, upload.array('images', 5), createProduct);

router
    .route('/:id')
    .get(getProduct)
    .put(protect, adminProtect, upload.array('images', 5), updateProduct)
    .delete(protect, adminProtect, deleteProduct);

module.exports = router;
