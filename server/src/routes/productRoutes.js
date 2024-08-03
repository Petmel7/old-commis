
const express = require('express');
const { getProducts, getProductById, getUserProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');
const router = express.Router();

router.get('/', protect, getUserProducts);
router.get('/all', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, upload.single('image'), addProduct);
router.patch('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;






