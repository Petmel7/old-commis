
const path = require('path');
const fs = require('fs');
const { Op, where } = require('sequelize');
const { Product, Category, Subcategory, User, } = require('../models');
const ProductService = require('../services/ProductService');

// Отримати всі продукти
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        next(error); // Передача в централізований обробник помилок
    }
};

// Отримати продукти поточного користувача
const getUserProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll({ where: { user_id: req.user.id } });
        res.json(products);
    } catch (error) {
        next(error);
    }
};

// Отримати продукт за ID
const getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req, res, next) => {
    const { name, description, price, stock, category, subcategory } = req.body;
    const images = req.files ? req.files.map(file => file.path.replace(`${path.join(__dirname, '../../')}`, '')) : [];

    try {
        // Знайдемо або створимо категорію
        let categoryRecord = await Category.findOne({ where: { name: category } });
        if (!categoryRecord) {
            categoryRecord = await Category.create({ name: category });
        }

        // Знайдемо або створимо підкатегорію
        let subcategoryRecord = await Subcategory.findOne({ where: { name: subcategory, category_id: categoryRecord.id } });
        if (!subcategoryRecord) {
            subcategoryRecord = await Subcategory.create({ name: subcategory, category_id: categoryRecord.id });
        }

        // Створюємо новий продукт із посиланням на підкатегорію
        const product = await Product.create({
            user_id: req.user.id,
            name,
            description,
            price,
            stock,
            images: images.length ? images : null,
            subcategory_id: subcategoryRecord.id,
            is_active: true
        });

        // Оновлюємо роль користувача на 'seller', якщо це необхідно
        const [updatedRows] = await User.update(
            { role: 'seller' },
            { where: { id: req.user.id } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'User not found or role not updated' });
        }

        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        next(error);
    }
};

// Оновити продукт
const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const images = req.files
        ? req.files.map(file => file.path.replace(`${path.join(__dirname, '../../')}`, ''))
        : null;

    try {
        const updateData = { name, description, price, stock };
        if (images) updateData.images = images;

        // Перевіряємо права доступу та оновлюємо продукт через сервіс
        await ProductService.checkOwnershipOrAdmin(req.user, id);
        const updatedProduct = await ProductService.updateProduct(id, updateData);

        res.json({ message: 'Продукт успішно оновлено', product: updatedProduct });
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Отримуємо продукт
        const product = await ProductService.findProductById(id);

        // Перевіряємо права доступу
        await ProductService.checkOwnershipOrAdmin(req.user, product);

        // Видаляємо продукт та пов'язані підкатегорії
        await ProductService.deleteProduct(product);

        // Перевіряємо та оновлюємо роль користувача
        await ProductService.updateUserRoleIfNoProducts(req.user.id);

        res.json({ message: 'Продукт і пов’язана підкатегорія успішно видалені' });
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        next(error);
    }
};

// Видалити зображення з продукту
const deleteImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { indices } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Видалення файлів за індексами
        const filesToDelete = indices.map(index => product.images[index]).filter(Boolean);

        filesToDelete.forEach(imagePath => {
            const fullPath = path.join(__dirname, '..', '..', imagePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        });

        // Оновлення масиву images
        product.images = product.images.filter((image, index) => !indices.includes(index));
        await product.save();

        res.send('Images deleted successfully');
    } catch (error) {
        next(error);
    }
};

// Пошук продуктів за назвою
const searchProducts = async (req, res, next) => {
    try {
        const { query } = req.query;

        // Пошук за назвою продукту
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`
                }
            }
        });

        res.json({ products });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getUserProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteImage,
    searchProducts
};
