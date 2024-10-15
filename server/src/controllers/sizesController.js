const Size = require('../models/Size');
const Product = require('../models/Product');

// Отримати всі доступні розміри для певного продукту
const getSizesByProductId = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByPk(productId, {
            include: {
                model: Size,
                through: { attributes: [] } // Приєднуємо розміри до продукту без додаткових полів з таблиці зв'язків
            }
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product.Sizes); // Повертаємо масив доступних розмірів
    } catch (error) {
        next(error);
    }
};

const addSizeToProduct = async (req, res, next) => {
    const { productId } = req.params;
    const { sizes } = req.body; // Приймаємо масив розмірів

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (sizes && sizes.length > 0) {
            for (const size of sizes) {
                if (!size || size.trim() === '') {
                    return res.status(400).json({ message: 'Invalid size' });
                }
                let sizeRecord = await Size.findOne({ where: { size } });
                if (!sizeRecord) {
                    sizeRecord = await Size.create({ size });
                }
                // Додаємо розмір до продукту
                await product.addSize(sizeRecord);
            }
        }

        res.status(201).json({ message: 'Sizes added successfully' });
    } catch (error) {
        next(error);
    }
};

// Видалити розмір для продукту
const removeSizeFromProduct = async (req, res, next) => {
    const { productId, sizeId } = req.params;

    try {
        const product = await Product.findByPk(productId);
        const size = await Size.findByPk(sizeId);

        if (!product || !size) {
            return res.status(404).json({ message: 'Product or Size not found' });
        }

        // Видалити розмір для продукту
        await product.removeSize(size);

        res.status(200).json({ message: 'Size removed successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSizesByProductId,
    addSizeToProduct,
    removeSizeFromProduct
};
