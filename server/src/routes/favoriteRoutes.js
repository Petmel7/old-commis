// server/src/routes/favoriteRoutes.js
const express = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addFavorite);

router.delete('/:id', protect, removeFavorite);

router.get('/', protect, getFavorites);

module.exports = router;
