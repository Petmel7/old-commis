
const { User, Order, Product, OrderItem, RefreshToken } = require('../models');
const AdminService = require('../services/AdminService');

const getUsersForAdmin = async (req, res, next) => {
    try {
        const users = await AdminService.getUsersForAdmin();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await AdminService.getUserById(id);

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const getOrdersForAdmin = async (req, res, next) => {
    try {
        const orders = await AdminService.getOrdersForAdmin();
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

const getProductsForAdmin = async (req, res, next) => {
    try {
        const products = await AdminService.getProductsForAdmin();
        res.json(products);
    } catch (error) {
        next(error);
    }
};

const getUserRoleCounts = async (req, res, next) => {
    try {
        const result = await AdminService.getUserRoleCounts();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getUsersByRole = async (req, res, next) => {
    const { role } = req.params;

    try {
        const users = await AdminService.getUsersByRole(role);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const deleteUserForAdmin = async (req, res, next) => {
    const { userId } = req.params;
    try {
        await AdminService.deleteUserForAdmin(userId);
        res.status(200).json({ message: 'Користувач та його дані успішно видалені.' });
    } catch (error) {
        next(error);
    }
};

// Контролер для оновлення профілю користувача
const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, phone, role } = req.body;
    try {
        await AdminService.updateUser(userId, name, email, phone, role);
    } catch (error) {
        next(error);
    }
};

const blockUser = async (req, res, next) => {
    const userId = req.params.userId;
    const { is_blocked } = req.body;

    try {
        const user = await AdminService.blockUser(userId, is_blocked);

        return res.status(200).json({
            message: `Статус блокування користувача успішно оновлено на ${is_blocked}`,
            user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsersForAdmin,
    getUserById,
    getOrdersForAdmin,
    getProductsForAdmin,
    getUserRoleCounts,
    getUsersByRole,
    deleteUserForAdmin,
    updateUser,
    blockUser,
};
