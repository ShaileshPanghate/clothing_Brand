const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

        // Loop over removeFields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Parse query string back to object
        let queryObj = JSON.parse(queryStr);

        // Case-insensitive category filter
        if (reqQuery.category) {
            queryObj.category = { $regex: new RegExp(`^${reqQuery.category}$`, 'i') };
        }

        // Basic search support
        if (req.query.search) {
            queryObj.name = { $regex: req.query.search, $options: 'i' };
        }

        // Finding resource
        query = Product.find(queryObj);

        // Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20; // Default 20
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Product.countDocuments();

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const products = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: products.length,
            pagination,
            data: products
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: `Product not found with id of ${req.params.id}` });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
exports.createProduct = async (req, res, next) => {
    try {
        let productData = { ...req.body };

        // If files are uploaded, use them. Otherwise, check for manual URLs in req.body.images
        if (req.files && req.files.length > 0) {
            const fileImages = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
            // Combine with any existing images sent as URLs in body if any
            let existingImages = [];
            if (req.body.images) {
                existingImages = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
            }
            productData.images = [...fileImages, ...existingImages];
        }

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: `Product not found with id of ${req.params.id}` });
        }

        let updateData = { ...req.body };

        // Handle file uploads
        if (req.files && req.files.length > 0) {
            const uploadedImages = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);

            // Logic: If they upload new images, we might want to keep or replace. 
            // For now, let's append to existing if 'appendImages' is true, else replace.
            if (req.body.appendImages === 'true') {
                updateData.images = [...product.images, ...uploadedImages];
            } else {
                updateData.images = uploadedImages;
            }
        }

        product = await Product.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: `Product not found with id of ${req.params.id}` });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};
