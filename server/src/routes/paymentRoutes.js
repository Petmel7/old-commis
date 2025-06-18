
const express = require('express');
const { createPayment, capturePayment, createCashPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createPayment);
router.post('/capture', protect, capturePayment);
router.post('/cash', protect, createCashPayment);

module.exports = router;
