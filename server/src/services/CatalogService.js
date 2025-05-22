const { Product, Subcategory } = require('../models');
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

module.exports = { getProductsByCategory }
