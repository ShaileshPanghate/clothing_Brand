const express = require('express');
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router
    .route('/')
    .get(getCategories)
    .post(protect, adminProtect, createCategory);

router
    .route('/:id')
    .put(protect, adminProtect, updateCategory)
    .delete(protect, adminProtect, deleteCategory);

module.exports = router;
