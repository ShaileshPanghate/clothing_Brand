const express = require('express');
const { register, login, loginAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', loginAdmin);
router.get('/me', protect, getMe);

module.exports = router;
