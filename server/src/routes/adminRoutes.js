const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUsersForAdmin, getOrdersForAdmin, getProductsForAdmin, getUserRoleCounts, getUsersByRole } = require('../controllers/adminController');

router.get('/users', protect, getUsersForAdmin);
router.get('/orders', protect, getOrdersForAdmin);
router.get('/products', protect, getProductsForAdmin);
router.get('/roles', protect, getUserRoleCounts);
router.get('/role/:role', protect, getUsersByRole);

module.exports = router;