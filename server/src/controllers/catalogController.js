
const CatalogService = require('../services/CatalogService');

const getProductsByCategory = async (req, res, next) => {
    const { category } = req.query;

    try {
        const validatedProducts = await CatalogService.getProductsByCategory(category);
        res.status(200).json({ status: 'success', data: validatedProducts });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProductsByCategory,
};
