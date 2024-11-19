const { Product, Subcategory } = require('../models');
const { validateProduct } = require('../validators/validators');

const getProductsByCategory = async (category) => {
    // Знайдемо підкатегорію по її назві
    const subcategoryRecord = await Subcategory.findOne({ where: { name: category } });

    if (!subcategoryRecord) {
        throw { status: 404, message: 'Subcategory not found' };
    }

    // Знайдемо всі продукти, які прив'язані до цієї підкатегорії
    const products = await Product.findAll({
        where: { subcategory_id: subcategoryRecord.id },
    });

    if (products.length === 0) {
        throw { status: 404, message: 'No products found for this subcategory' };
    }

    // Валідація продуктів (опціонально)
    const validatedProducts = products.map(validateProduct);

    return validatedProducts;
}

module.exports = { getProductsByCategory }