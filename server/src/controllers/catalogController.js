
const { Product } = require('../models');
const { createResponse } = require('../utils/response');
const { productSchema } = require('../validators/validators');

const getProductsByCategory = async (req, res, next) => {
    const { category } = req.query;

    try {
        const products = await Product.findAll({
            where: { category },
        });

        // Валідація кожного продукту перед відправкою
        const validatedProducts = products.map(product => {
            const { error, value } = productSchema.validate(product.dataValues || product);
            if (error) {
                throw new Error(`Validation error: ${error.details[0].message}`);
            }
            return value;
        });

        createResponse(res, 200, validatedProducts); // Надсилаємо тільки валідовані дані
    } catch (error) {
        createResponse(res, 500, {}, error.message, 'server_error');
    }
};

// Отримання списку категорій
const getCategoryList = async (req, res, next) => {
    try {
        const categories = await Product.findAll({
            attributes: ['category'],
            group: ['category'],
            order: [['category', 'ASC']]
        });
        createResponse(res, 200, categories.map(cat => cat.category));
    } catch (error) {
        next(error); // передати помилку в middleware для обробки
    }
};

module.exports = {
    getProductsByCategory,
    getCategoryList,
};
