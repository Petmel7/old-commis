const { Product, Category, Subcategory } = require('../models');
const { validateProduct } = require('../validators/validators');
const { Op } = require('sequelize');

const getProductsByCategory = async (category) => {
    const subcategoryRecord = await Subcategory.findOne({
        where: {
            name: {
                [Op.iLike]: category
            }
        }
    });

    if (!subcategoryRecord) return [];

    const products = await Product.findAll({
        where: { subcategory_id: subcategoryRecord.id },
    });

    return products.map(validateProduct);
};

const getSubcategoryById = async (id) => {
    return await Subcategory.findByPk(id);
};

const getCategoryBySubcategoryId = async (subcategoryId) => {
    const subcategory = await Subcategory.findByPk(subcategoryId);
    if (!subcategory) return null;

    const category = await Category.findByPk(subcategory.category_id);
    return category;
};

module.exports = {
    getProductsByCategory,
    getSubcategoryById,
    getCategoryBySubcategoryId
}
