const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get current user's cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: []
            });
        }

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity, size, color } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: []
            });
        }

        // Check if product already exists in cart with same size and color
        const itemIndex = cart.items.findIndex(
            p =>
                p.product.toString() === productId &&
                p.size === size &&
                (p.color === color || (!p.color && !color))
        );

        if (itemIndex > -1) {
            // Product exists in cart, update quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Product does not exist in cart, add new item
            cart.items.push({
                product: productId,
                quantity,
                size,
                color
            });
        }

        await cart.save();

        // Re-fetch to populate product details
        cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
exports.updateCartItem = async (req, res, next) => {
    try {
        const { itemId, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        // Find item by _id in the items array
        const itemIndex = cart.items.findIndex(p => p._id.toString() === itemId);

        if (itemIndex > -1) {
            if (quantity > 0) {
                cart.items[itemIndex].quantity = quantity;
            } else {
                // Remove if quantity is 0 or less
                cart.items.splice(itemIndex, 1);
            }
        } else {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        await cart.save();

        // Re-fetch to populate
        cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:itemId
// @access  Private
exports.removeFromCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);

        await cart.save();

        cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (err) {
        next(err);
    }
};
