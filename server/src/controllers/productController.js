
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { Product, User } = require('../models');

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { user_id: req.user.id } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addProduct = async (req, res) => {
    const { name, description, price, stock, category } = req.body;
    const images = req.files ? req.files.map(file => file.path.replace(`${path.join(__dirname, '../../')}`, '')) : [];

    try {
        const product = await Product.create({
            user_id: req.user.id,
            name,
            description,
            price,
            stock,
            images: images.length ? images : null,
            category
        });

        // Оновлення ролі користувача з buyer на seller, якщо продукт успішно доданий
        if (req.user.role === 'buyer') {
            await User.update(
                { role: 'seller' }, // Зміна ролі на seller
                { where: { id: req.user.id } } // Умова для оновлення
            );
            req.user.role = 'seller'; // Оновлюємо роль в поточній сесії, якщо це необхідно
        }

        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const images = req.files ? req.files.map(file => file.path.replace(`${path.join(__dirname, '../../')}`, '')) : null;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.user_id !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this product' });
        }

        const updateData = { name, description, price, stock };

        if (images) {
            updateData.images = images;
        }

        await product.update(updateData);
        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.user_id !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { indices } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Знаходження файлів для видалення за індексами
        const filesToDelete = indices.map(index => product.images[index]).filter(Boolean);

        // Видалення файлів
        filesToDelete.forEach(imagePath => {
            const fullPath = path.join(__dirname, '..', '..', imagePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        });

        // Оновлення масиву images продукту
        product.images = product.images.filter((image, index) => !indices.includes(index));
        await product.save();

        res.send('Images deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;

        // Виконання пошуку за назвою та описом продукту
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%` // Пошук за частковим співпадінням
                }
            }
        });

        res.json({ products });
    } catch (error) {
        console.error('Помилка при пошуку продуктів:', error);
        res.status(500).json({ message: 'Помилка при пошуку продуктів' });
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
