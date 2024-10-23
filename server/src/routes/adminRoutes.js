const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUsersForAdmin, getOrdersForAdmin, getProductsForAdmin } = require('../controllers/adminController');

router.get('/users', protect, getUsersForAdmin);
router.get('/orders', protect, getOrdersForAdmin);
router.get('/products', protect, getProductsForAdmin);

module.exports = router;