const { Product, Subcategory } = require('../models');
const { validateProduct } = require('../validators/validators');

const getProductsByCategory = async (category) => {
    // Знайдемо підкатегорію по її назві
    const subcategoryRecord = await Subcategory.findOne({ where: { name: category } });

    if (!subcategoryRecord) {
        return []; // Якщо підкатегорія не знайдена, повертаємо порожній масив
    }

    // Знайдемо всі продукти, які прив'язані до цієї підкатегорії
    const products = await Product.findAll({
        where: { subcategory_id: subcategoryRecord.id },
    });

    // Валідація продуктів (опціонально)
    return products.map(validateProduct);
};

module.exports = { getProductsByCategory }
