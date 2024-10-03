
const { Product } = require('../models');
const Subcategory = require('../models/Subcategory');
// const { createResponse } = require('../utils/response');
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
        // Знайдемо підкатегорію по її назві
        const subcategoryRecord = await Subcategory.findOne({ where: { name: category } });

        if (!subcategoryRecord) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        // Знайдемо всі продукти, які прив'язані до цієї підкатегорії
        const products = await Product.findAll({
            where: { subcategory_id: subcategoryRecord.id },
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this subcategory' });
        }

        // Валідація продуктів (опціонально)
        const validatedProducts = products.map(validateProduct);

        res.status(200).json({ status: 'success', data: validatedProducts });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProductsByCategory,
};
