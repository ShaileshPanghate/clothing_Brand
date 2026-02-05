const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
exports.getDashboardStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();

        // Calculate total revenue
        const orders = await Order.find({ isPaid: true });
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        // Get recent orders
        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name');

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalOrders,
                totalProducts,
                totalRevenue,
                recentOrders
            }
        });
    } catch (err) {
        next(err);
    }
};
