
const express = require('express');
const {
    createOrder,
    deleteOrder,
    getUserOrders,
    getSellerOrders,
    getSellerOrderById,
    cancelOrderBySeller
} = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getUserOrders);
router.get('/seller', protect, getSellerOrders);
router.get('/seller/order/:id', protect, getSellerOrderById);
router.post('/', protect, createOrder);
router.delete('/:id', protect, deleteOrder);
router.put('/:id', protect, cancelOrderBySeller);

module.exports = router;