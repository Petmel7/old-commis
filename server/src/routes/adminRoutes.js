const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUsersForAdmin, getOrdersForAdmin, getProductsForAdmin, getUserRoleCounts, getUsersByRole, deleteUserForAdmin, getUserById, updateUser, blockUser, blockProduct } = require('../controllers/adminController');
const { getActiveSellers, getActiveSellersById, getNewSellers, getBlockedSellers, getSellerStatistics, getSellerStatisticsById } = require('../controllers/sellerController');

router.get('/users', protect, getUsersForAdmin);
router.get('/users/:id', protect, getUserById);
router.get('/orders', protect, getOrdersForAdmin);
router.get('/products', protect, getProductsForAdmin);
router.get('/roles', protect, getUserRoleCounts);
router.get('/role/:role', protect, getUsersByRole);
router.get('/active-sellers', protect, getActiveSellers);
router.get('/new-sellers', protect, getNewSellers);
router.get('/blocked-sellers', getBlockedSellers);
router.get('/sellers/statistics', protect, getSellerStatistics);
router.get('/sellers/statistics/:sellerId', protect, getSellerStatisticsById);
router.get('/active-sellers/:sellerId', protect, getActiveSellersById);
router.delete('/users/:userId', protect, deleteUserForAdmin);
router.patch('/users/update/:id', protect, updateUser);
router.put('/users/block/:userId', protect, blockUser);
router.put('/products/block/:productId', protect, blockProduct);

module.exports = router;