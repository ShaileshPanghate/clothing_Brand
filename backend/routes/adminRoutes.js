const express = require('express');
const { getDashboardStats } = require('../controllers/adminController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.use(adminProtect);

router.get('/dashboard', getDashboardStats);

module.exports = router;
