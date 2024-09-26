
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { Product, User } = require('../models');

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

// // Додати новий продукт
// const addProduct = async (req, res, next) => {
//     const { name, description, price, stock, category } = req.body;
//     const images = req.files ? req.files.map(file => file.path.replace(`${path.join(__dirname, '../../')}`, '')) : [];

//     try {
//         const product = await Product.create({
//             user_id: req.user.id,
//             name,
//             description,
//             price,
//             stock,
//             images: images.length ? images : null,
//             category
//         });

//         // Оновлення ролі користувача з 'buyer' на 'seller'
//         if (req.user.role === 'buyer') {
//             await User.update({ role: 'seller' }, { where: { id: req.user.id } });
//             req.user.role = 'seller'; // Оновлюємо роль у сесії
//         }

//         res.status(201).json({ message: 'Product added successfully', product });
//     } catch (error) {
//         next(error);
//     }
// };

// Додати новий продукт
const addProduct = async (req, res, next) => {
    const { name, description, price, stock, category, subcategory } = req.body;
    const images = req.files ? req.files.map(file => file.path.replace(`${path.join(__dirname, '../../')}`, '')) : [];

    try {
        const product = await Product.create({
            user_id: req.user.id,
            name,
            description,
            price,
            stock,
            images: images.length ? images : null,
            category, // основна категорія
            subcategory // нове поле для підкатегорії
        });

        // Оновлення ролі користувача з 'buyer' на 'seller'
        if (req.user.role === 'buyer') {
            await User.update({ role: 'seller' }, { where: { id: req.user.id } });
            req.user.role = 'seller'; // Оновлюємо роль у сесії
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
        next(error);
    }
};

// Видалити продукт
const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    console.log('@@@deleteProduct->id', id);
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
