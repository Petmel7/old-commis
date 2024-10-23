
const { User, Order, Product } = require('../models');


const getUsersForAdmin = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getOrdersForAdmin = async (req, res, next) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

const getProductsForAdmin = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getUsersForAdmin,
    getOrdersForAdmin,
    getProductsForAdmin
};
