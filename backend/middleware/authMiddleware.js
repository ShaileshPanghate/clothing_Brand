const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Try finding in User first, then Admin
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            // If not in User, check Admin
            req.user = await Admin.findById(decoded.id);
        }

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
        }

        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user.role || !roles.includes(req.user.role)) {
            if (req.user.role === 'superadmin') {
                // Superadmin can access everything
                return next();
            }
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

/* 
 * Specific middleware to ensure the user is an admin.
 * This simplifies checking separate Admin collection if necessary, 
 * though the protect middleware above handles both collections for req.user populate.
 */
exports.adminProtect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({ success: false, message: 'Not authorized as admin' });
        }

        req.user = admin; // standardized as req.user
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};
