
const { Product } = require('../models');
const { createResponse } = require('../utils/response');
const { productSchema } = require('../validators/validators');

const validateProduct = (product) => {
    const { error, value } = productSchema.validate(product.dataValues || product);
    if (error) {
        throw new Error(`Validation error: ${error.details[0].message}`);
    }
    return value;
}

const getProductsByCategory = async (req, res, next) => {
    const { category } = req.query;

    try {
        const products = await Product.findAll({
            where: { category },
        });

        const validatedProducts = products.map(validateProduct);

        createResponse(res, 200, validatedProducts);
    } catch (error) {
        next(error);
    }
};

const getCategoryList = async (req, res, next) => {
    try {
        const categories = await Product.findAll({
            attributes: ['category'],
            group: ['category'],
            order: [['category', 'ASC']]
        });
        createResponse(res, 200, categories.map(cat => cat.category));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProductsByCategory,
    getCategoryList,
};
