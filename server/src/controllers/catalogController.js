
const { Product } = require('../models');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const { createResponse } = require('../utils/response');
const { productSchema } = require('../validators/validators');

const validateProduct = (product) => {
    const { error, value } = productSchema.validate(product.dataValues || product);
    if (error) {
        throw new Error(`Validation error: ${error.details[0].message}`);
    }
    return value;
}

// const getProductsByCategory = async (req, res, next) => {
//     const { category } = req.query;

//     try {
//         const products = await Product.findAll({
//             where: { category },
//         });

//         const validatedProducts = products.map(validateProduct);

//         createResponse(res, 200, validatedProducts);
//     } catch (error) {
//         next(error);
//     }
// };

const getProductsByCategory = async (req, res, next) => {
    const { category } = req.query;

    try {
        // Знайдемо категорію по її назві
        const categoryRecord = await Category.findOne({ where: { name: category } });

        if (!categoryRecord) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Знайдемо всі підкатегорії, пов'язані з цією категорією
        const subcategories = await Subcategory.findAll({ where: { category_id: categoryRecord.id } });
        const subcategoryIds = subcategories.map(subcat => subcat.id);

        // Знайдемо всі продукти, які прив'язані до цих підкатегорій
        const products = await Product.findAll({
            where: { subcategory_id: subcategoryIds },
        });

        // Валідація продуктів (опціонально)
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
