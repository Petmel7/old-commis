
const express = require('express');
const router = express.Router();
const { getProductsByCategory, fetchSubcategoryById, fetchCategoryBySubcategoryId } = require('../controllers/catalogController');

router.get('/', getProductsByCategory);
router.get('/categories/by-subcategory/:subcategoryId', fetchCategoryBySubcategoryId);
router.get('/subcategories/:id', fetchSubcategoryById);

module.exports = router;
