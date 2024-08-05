
const path = require('path');
const Product = require('../models/Product');

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
    const { name, description, price, stock } = req.body;
    const images = req.files ? req.files.map(file => file.path.replace(`${path.join(__dirname, '../../')}`, '')) : [];

    try {
        const product = await Product.create({
            user_id: req.user.id,
            name,
            description,
            price,
            stock,
            images: images.length ? images : null
        });

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

module.exports = {
    getProducts,
    getUserProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
