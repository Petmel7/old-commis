const Size = require('../models/Size');
const Product = require('../models/Product');

const getSizesByProductId = async (productId) => {
    const product = await Product.findByPk(productId, {
        include: {
            model: Size,
            through: { attributes: [] }
        }
    });

    if (!product) {
        throw { status: 404, message: 'Product not found' };
    }

    return product.Sizes;
};

const addSizeToProduct = async (productId, sizes) => {
    const product = await Product.findByPk(productId);

    if (!product) {
        throw { status: 404, message: 'Product not found' };
    }

    if (sizes && sizes.length > 0) {
        for (const size of sizes) {
            if (!size || size.trim() === '') {
                throw { status: 400, message: 'Invalid size' };
            }
            let sizeRecord = await Size.findOne({ where: { size } });
            if (!sizeRecord) {
                sizeRecord = await Size.create({ size });
            }
            // Додаємо розмір до продукту
            await product.addSize(sizeRecord);
        }
    }
};

const removeSizeFromProduct = async (productId, sizeId) => {
    const product = await Product.findByPk(productId);
    const size = await Size.findByPk(sizeId);

    if (!product || !size) {
        throw { status: 404, message: 'Product or Size not found' };
    }

    await product.removeSize(size);
}

const removeAllSizesFromProduct = async (productId) => {
    const product = await Product.findByPk(productId, {
        include: Size,
    });

    if (!product) {
        throw { status: 404, message: 'Product not found' };
    }

    await product.setSizes([]); // Видаляє всі зв'язки
};

module.exports = {
    getSizesByProductId,
    addSizeToProduct,
    removeSizeFromProduct,
    removeAllSizesFromProduct
}