const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
        maxlength: [100, 'Name can not be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    discountPrice: {
        type: Number // Optional discounted price
    },
    category: {
        type: String, // Storing category name as string for simplicity like in frontend data
        required: true,
        index: true
    },
    sizes: [{
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size']
    }],
    colors: [{
        name: String,
        hex: String
    }],
    images: [{
        type: String, // Array of image URLs
        required: true
    }],
    stock: {
        type: Number,
        default: 0
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
