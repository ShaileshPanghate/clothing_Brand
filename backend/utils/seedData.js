const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Admin = require('../models/Admin');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: '../.env' }); // Adjusted path if run from utils folder

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

// Import Data
const importData = async () => {
    try {
        // Clear DB
        await Product.deleteMany();
        await Category.deleteMany();
        await Admin.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed...');

        // Create Admin
        await Admin.create({
            name: 'Admin User',
            email: process.env.ADMIN_EMAIL || 'admin@clothingbrand.com',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            role: 'superadmin'
        });

        // Create User
        await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            phone: '1234567890'
        });

        // Create Categories
        const categories = await Category.create([
            { name: 'Men', description: 'Mens wear' },
            { name: 'Women', description: 'Womens wear' },
            { name: 'Kids', description: 'Kids wear' },
            { name: 'Accessories', description: 'Fashion accessories' }
        ]);

        // Create Products
        await Product.create([
            {
                name: "Classic White T-Shirt",
                description: "Premium cotton classic fit t-shirt.",
                price: 799,
                category: "Men",
                sizes: ["S", "M", "L", "XL"],
                images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"],
                stock: 50,
                isBestSeller: true
            },
            {
                name: "Denim Jacket",
                description: "Vintage style denim jacket for all seasons.",
                price: 2499,
                category: "Men",
                sizes: ["M", "L", "XL"],
                images: ["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"],
                stock: 30
            },
            {
                name: "Floral Summer Dress",
                description: "Lightweight floral dress perfect for summer.",
                price: 1899,
                category: "Women",
                sizes: ["XS", "S", "M"],
                images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"],
                stock: 40,
                isBestSeller: true
            },
            {
                name: "Hooded Sweatshirt",
                description: "Cozy fleece hoodie in oatmeal color.",
                price: 1499,
                category: "Women",
                sizes: ["S", "M", "L"],
                images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"],
                stock: 60
            }
        ]);

        console.log('Data Imported!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete Data
const deleteData = async () => {
    try {
        await Product.deleteMany();
        await Category.deleteMany();
        await Admin.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
