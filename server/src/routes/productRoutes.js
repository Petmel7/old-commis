
// // server/src/routes/productRoutes.js
// const express = require('express');
// const { getProducts, getProductById, getUserProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
// const { protect } = require('../middleware/authMiddleware');
// const upload = require('../config/multerConfig');
// const router = express.Router();

// router.get('/', getProducts);
// router.get('/:id', getProductById);
// // router.get('/:id', protect, getUserProducts);
// router.post('/', protect, upload.single('image'), addProduct);
// router.put('/:id', protect, upload.single('image'), updateProduct);
// router.delete('/:id', protect, deleteProduct);

// module.exports = router;




const express = require('express');
const { getProducts, getProductById, getUserProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');
const router = express.Router();

router.get('/', protect, getUserProducts); // Змінено для отримання продуктів конкретного користувача
router.get('/all', getProducts); // Новий маршрут для отримання всіх продуктів (опціонально)
router.get('/:id', getProductById);
router.post('/', protect, upload.single('image'), addProduct);
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;





