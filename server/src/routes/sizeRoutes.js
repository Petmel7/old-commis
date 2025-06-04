
const express = require('express');
const { getSizesByProductId, addSizeToProduct, removeSizeFromProduct, removeAllSizesFromProduct } = require('../controllers/sizesController');
const router = express.Router();

router.get('/:productId/sizes', getSizesByProductId);
router.post('/:productId/sizes', addSizeToProduct);
router.delete('/:productId/sizes/:sizeId', removeSizeFromProduct);
router.post('/sizes/remove-all', removeAllSizesFromProduct);

module.exports = router;
