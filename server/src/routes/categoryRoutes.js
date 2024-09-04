// server/src/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { getCategoryList } = require('../controllers/categoryController');

router.get('/categories', getCategoryList);

module.exports = router;
