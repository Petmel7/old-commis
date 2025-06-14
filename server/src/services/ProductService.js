const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const paginate = require('../utils/paginate');
const parsePagination = require('../utils/parsePagination');
const { User, Product, Order, OrderItem, Category, Subcategory, Size } = require('../models');

const getProducts = async (page, limit) => {
    const { page: pageNum, limit: limitNum } = parsePagination(page, limit);

    return await paginate(Product, {
        page: pageNum,
        limit: limitNum,
    });
};

const getUserProducts = async ({ userId, page, limit }) => {
    const { page: pageNum, limit: limitNum } = parsePagination(page, limit);

    return await paginate(Product, {
        page: pageNum,
        limit: limitNum,
        where: { user_id: userId },
    });
};

const getProductById = async (id) => {
    const product = await Product.findByPk(id, {
        include: [
            {
                model: Subcategory,
                as: 'subcategory',
                include: [
                    {
                        model: Category,
                        as: 'category'
                    }
                ]
            },
            {
                model: Size
            }
        ]
    });

    if (!product) {
        throw { status: 404, message: 'Product not found' };
    }

    return product;
};

const addProduct = async ({ userId, name, description, price, stock, category, subcategory, images }) => {

    let categoryRecord = await Category.findOne({ where: { name: category } });
    if (!categoryRecord) {
        categoryRecord = await Category.create({ name: category });
    }

    let subcategoryRecord = await Subcategory.findOne({ where: { name: subcategory, category_id: categoryRecord.id } });
    if (!subcategoryRecord) {
        subcategoryRecord = await Subcategory.create({ name: subcategory, category_id: categoryRecord.id });
    }

    const product = await Product.create({
        user_id: userId,
        name,
        description,
        price,
        stock,
        images: images.length ? images : null,
        subcategory_id: subcategoryRecord.id,
        is_active: true
    });

    return product;
};

const updateProduct = async (id, updateData) => {
    const product = await getProductById(id);
    await product.update(updateData);

    return product;
};

const findProductById = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw { status: 404, message: 'Product not found' };
    }
    return product;
};

const checkOwnershipOrAdmin = async (user, productId) => {
    const product = await Product.findByPk(productId);
    console.log('Checking access rights:', { userId: user.id, role: user.role, product });

    if (!product) {
        throw { status: 404, message: 'Product not found' };
    }

    if (user.role !== 'superadmin' && product.user_id !== user.id) {
        throw { status: 403, message: 'You cannot edit this product' };
    }

    return product;
};

const deleteProduct = async (product) => {
    const ordersWithProduct = await Order.findAll({
        include: [{
            model: OrderItem,
            where: { product_id: product.id }
        }]
    });

    if (ordersWithProduct.length > 0) {
        throw {
            status: 400,
            message: 'Неможливо видалити продукт, оскільки він уже є в замовленнях. Видаліть спочатку замовлення.'
        };
    }

    const userId = product.user_id; // ✅ ідентифікація продавця
    const subcategoryId = product.subcategory_id;

    await product.destroy();

    if (subcategoryId) {
        const remainingProductsInSub = await Product.count({
            where: { subcategory_id: subcategoryId }
        });

        if (remainingProductsInSub === 0) {
            await Subcategory.destroy({ where: { id: subcategoryId } });
        }
    }

    // ✅ Перевірка: чи є ще продукти в цього продавця
    const remainingProductsForUser = await Product.count({
        where: { user_id: userId }
    });

    if (remainingProductsForUser === 0) {
        await User.update(
            { role: 'buyer' },
            { where: { id: userId } }
        );
    }
};

const deleteImagesFromProduct = async (productId, indices) => {
    // Знаходимо продукт
    const product = await Product.findByPk(productId);

    if (!product) {
        throw { status: 404, message: 'Product not found' };
    }

    // Отримуємо шляхи зображень, які потрібно видалити
    const filesToDelete = indices.map(index => product.images[index]).filter(Boolean);

    // Видаляємо файли з файлової системи
    filesToDelete.forEach(imagePath => {
        const fullPath = path.join(__dirname, '..', '..', imagePath);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    });

    // Оновлюємо масив зображень у продукті
    product.images = product.images.filter((image, index) => !indices.includes(index));
    await product.save();
};

const searchProducts = async (query) => {
    if (!query) {
        throw new Error('The search query cannot be empty');
    }

    // Пошук продуктів за назвою
    const products = await Product.findAll({
        where: {
            name: {
                [Op.iLike]: `%${query}%`
            }
        }
    });

    return products;
};

module.exports = {
    getProducts,
    getUserProducts,
    getProductById,
    addProduct,
    updateProduct,
    findProductById,
    checkOwnershipOrAdmin,
    deleteProduct,
    deleteImagesFromProduct,
    searchProducts
};

