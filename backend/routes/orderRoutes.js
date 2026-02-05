const express = require('express');
const {
    addOrderItems,
    getOrderById,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    updateOrderStatus
} = require('../controllers/orderController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, adminProtect, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect, adminProtect, updateOrderToDelivered);
router.route('/:id/status').put(protect, adminProtect, updateOrderStatus);

module.exports = router;
