const express = require('express');
const { getUsers, getUserById, updateUser } = require('../controllers/userController');
const { protect, adminProtect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.put('/update', updateUser);

router.use(adminProtect);
router.route('/').get(getUsers);
router.route('/:id').get(getUserById);

module.exports = router;
