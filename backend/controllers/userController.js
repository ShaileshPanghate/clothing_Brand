const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin)
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (Admin)
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};
