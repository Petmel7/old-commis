
const path = require('path');
const ProductService = require('../services/ProductService');
const UserService = require('../services/UserService');

// const getProducts = async (req, res, next) => {
//     try {
//         const products = await ProductService.getProducts();
//         res.json(products);
//     } catch (error) {
//         console.error('DB error:', error);
//         next(error);
//     }
// };

const getProducts = async (req, res, next) => {
    try {
        const products = await ProductService.getProducts(req.query.page, req.query.limit);
        res.json(products);
    } catch (error) {
        console.error('DB error:', error);
        next(error);
    }
};

const getUserProducts = async (req, res, next) => {
    try {
        const products = await ProductService.getUserProducts({
            userId: req.user.id,
            page: req.query.page,
            limit: req.query.limit
        });

        res.json(products);
    } catch (error) {
        next(error);
    }
};

// const getUserProducts = async (req, res, next) => {
//     try {
//         const products = await ProductService.getUserProducts({ where: { user_id: req.user.id } });
//         res.json(products);
//     } catch (error) {
//         next(error);
//     }
// };

const getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await ProductService.getProductById(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req, res, next) => {
    const {
        name,
        description,
        price,
        stock,
        category,
        subcategory,
        images
    } = req.body;

    try {
        const product = await ProductService.addProduct({
            userId: req.user.id,
            name,
            description,
            price,
            stock,
            category,
            subcategory,
            images
        });

        await UserService.updateUserRoleIfNecessary(req.user);

        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, stock, images } = req.body;

    try {
        const updateData = { name, description, price, stock };
        if (images) updateData.images = images;

        await ProductService.checkOwnershipOrAdmin(req.user, id);
        const updatedProduct = await ProductService.updateProduct(id, updateData);

        res.json({ message: 'The product has been updated successfully', product: updatedProduct });
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
        const product = await ProductService.findProductById(id);

        await ProductService.checkOwnershipOrAdmin(req.user, product.id);

        await ProductService.deleteProduct(product);

        // await ProductService.updateUserRoleIfNoProducts(req.user.id);

        res.json({ message: 'The product and associated subcategory have been successfully deleted' });
    } catch (error) {
        console.error('❌ Delete product error:', error);

        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        next(error);
    }
};

const deleteImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { indices } = req.body;

        await ProductService.deleteImagesFromProduct(id, indices);

        res.send('Images deleted successfully');
    } catch (error) {
        next(error);
    }
};

const searchProducts = async (req, res, next) => {
    try {
        const { query } = req.query;

        const products = await ProductService.searchProducts(query);

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
