// routes/catalogRoutes.js
const express = require('express');
const router = express.Router();
const { getProductsByCategory, getCategoryList } = require('../controllers/catalogController');

router.get('/', getProductsByCategory);
router.get('/categories', getCategoryList);

module.exports = router;
