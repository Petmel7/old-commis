
const express = require('express');
const { createOrder, deleteOrder, getUserOrders, getSellerOrders, cancelOrderBySeller } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getUserOrders);
router.get('/seller', protect, getSellerOrders);
router.post('/', protect, createOrder);
router.delete('/:id', protect, deleteOrder);
router.put('/:id', protect, cancelOrderBySeller);

module.exports = router;