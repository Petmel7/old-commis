// const express = require('express');
// const { createPayment } = require('../controllers/paymentController');
// const { protect } = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/', protect, createPayment);

// module.exports = router;

const express = require('express');
const { createPayment, capturePayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', protect, createPayment);
router.post('/capture', protect, capturePayment);

module.exports = router;
