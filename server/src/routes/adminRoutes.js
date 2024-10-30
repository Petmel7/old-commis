const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUsersForAdmin, getOrdersForAdmin, getProductsForAdmin, getUserRoleCounts, getUsersByRole, deleteUserForAdmin, getUserById, updateUser, blockUser } = require('../controllers/adminController');

router.get('/users', protect, getUsersForAdmin);
router.get('/users/:id', protect, getUserById);
router.get('/orders', protect, getOrdersForAdmin);
router.get('/products', protect, getProductsForAdmin);
router.get('/roles', protect, getUserRoleCounts);
router.get('/role/:role', protect, getUsersByRole);
router.delete('/users/:userId', protect, deleteUserForAdmin);
router.patch('/users/update/:id', protect, updateUser);
router.put('/users/block/:userId', protect, blockUser);

module.exports = router;