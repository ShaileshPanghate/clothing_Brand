const express = require('express');
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // Protect all routes

router.route('/').get(getCart);
router.route('/add').post(addToCart);
router.route('/update').put(updateCartItem);
router.route('/remove/:itemId').delete(removeFromCart);

module.exports = router;
